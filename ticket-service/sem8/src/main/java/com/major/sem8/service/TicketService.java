package com.major.sem8.service;

import com.google.zxing.WriterException;
import com.major.sem8.entity.Payment;
import com.major.sem8.dto.TicketResponse;
import com.major.sem8.entity.Ticket;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.proxy.NewPlaceProxy;
import com.major.sem8.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private QRService qrService;

    @Autowired
    private NewPlaceProxy placeProxy;

    @Autowired
    private KafkaTemplate<String,Ticket> kafkaTemplate;

    private static Logger LOG = LoggerFactory.getLogger(TicketService.class);

    protected Double getTicketPrice(Long placeId){
        try{
            Double price = placeProxy.getPrice(placeId).getBody();
            System.out.println(price);
            return price;
        }catch (Exception e){
            throw new ApplicationException("UNABLE TO FETCH PRICE",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected Double getTicketPriceForEvent(Long eventId){
        try{
            Double price = placeProxy.getEventPrice(eventId).getBody();
//            System.out.println(price);
            return price;
        }catch (Exception e){
            throw new ApplicationException("UNABLE TO FETCH PRICE",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected TicketResponse buyTicketForPlace(Ticket details){
        Double singleTicketPrice = getTicketPrice(details.getPlaceId());
        try {
            details.setPrice(details.getQuantity() * singleTicketPrice);
            String ticketId = UUID.randomUUID().toString();
            details.setTicketId(ticketId);
            details.setConfirmation(false);
            details.setValid(false);
            Ticket ticket = ticketRepository.save(details);

            LOG.info("Processed: ticket->{}", ticket);

            CompletableFuture<SendResult<String, Ticket>> result = kafkaTemplate
                    .send("ticket-event", ticket);
            result.whenComplete((sr, ex) ->
                    LOG.debug("Sent(key={},partition={}): {}",
                            sr.getProducerRecord().partition(),
                            sr.getProducerRecord().key(),
                            sr.getProducerRecord().value()));

            return mapToDto(ticket);

        }catch(Exception e){
            throw new ApplicationException("error while generating ticket", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected TicketResponse buyTicketForEvent(Ticket details){
        Double singleTicketPrice = getTicketPriceForEvent(details.getEventId());
        try {
            details.setPrice(details.getQuantity() * singleTicketPrice);
            String ticketId = UUID.randomUUID().toString();
            details.setTicketId(ticketId);
            details.setConfirmation(false);
            details.setValid(false);
            Ticket ticket = ticketRepository.save(details);

            LOG.info("Processed: ticket->{}", ticket);

            CompletableFuture<SendResult<String, Ticket>> result = kafkaTemplate
                    .send("ticket-event", ticket);
            result.whenComplete((sr, ex) ->
                    LOG.debug("Sent(key={},partition={}): {}",
                            sr.getProducerRecord().partition(),
                            sr.getProducerRecord().key(),
                            sr.getProducerRecord().value()));

            return mapToDto(ticket);

        }catch(Exception e){
//            e.printStackTrace();
//            throw new ApplicationException("error while generating ticket", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException(e);
        }
    }
    public TicketResponse buyTicket(Ticket details) {
        try {
            if (details.getPlaceId() == null && details.getEventId() == null) {
                throw new ApplicationException("Invalid Request", HttpStatus.BAD_REQUEST);
            } else if (details.getEventId() != null && details.getPlaceId() != null) {
                throw new ApplicationException("Invalid Request", HttpStatus.BAD_REQUEST);
            } else if (details.getPlaceId() != null) {
                return buyTicketForPlace(details);
            } else {
                return buyTicketForEvent(details);
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException("couldn't process buy ticket request",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<TicketResponse> getAllTicketsByUser(String email){
        try{
            List<Ticket> tickets = ticketRepository.findAllByEmailOrderByIdDesc(email);
            return tickets.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new ApplicationException("couldn't get tickets for the user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void processPaymentStatus(Payment payment){
        Ticket ticket = ticketRepository.findByTicketId(payment.getTicketId())
                .orElseThrow(() -> new ApplicationException("ERROR WHILE FETCHING TICKET",HttpStatus.BAD_REQUEST));
        try{
            if(payment.getPaymentStatus().equals("SUCCESSFUL")){
                ticket.setConfirmation(true);
                ticket.setValid(true);
                ticketRepository.save(ticket);

                LOG.info("Processed: ticket->{}", ticket);

                CompletableFuture<SendResult<String, Ticket>> result = kafkaTemplate
                        .send("email-event", ticket);
                result.whenComplete((sr, ex) ->
                        LOG.debug("Sent(key={},partition={}): {}",
                                sr.getProducerRecord().partition(),
                                sr.getProducerRecord().key(),
                                sr.getProducerRecord().value()));
            }
        }catch (Exception e){
            throw new ApplicationException("ERROR WHILE UPDATING TICKET STATUS",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected TicketResponse mapToDto(Ticket ticket){
        byte[] qr = null;
        String image = null;
        try {
            if(ticket.getPlaceId() != null) {
                image = placeProxy.getImage(ticket.getPlaceId()).getBody();
            }else{
                image = placeProxy.getEventImage(ticket.getEventId()).getBody();
            }
        }catch (Exception e){
            throw new ApplicationException("error while getting image", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(ticket.isValid()){
            try {
                qr = qrService.generateQRCodeImage(ticket.getTicketId());
            } catch (WriterException ex) {
                throw new ApplicationException("error while generating qr", HttpStatus.INTERNAL_SERVER_ERROR);
            } catch (IOException ex) {
                throw new ApplicationException("error while generating qr", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return TicketResponse.builder()
                .ticketId(ticket.getTicketId())
                .price(ticket.getPrice())
                .confirmation(ticket.isConfirmation())
                .bookedDates(ticket.getBookedDates())
                .quantity(ticket.getQuantity())
                .placeName(ticket.getPlaceName())
                .isValid(ticket.isValid())
                .ticketQr(qr)
                .placeImage(image)
                .email(ticket.getEmail())
                .placeId(ticket.getPlaceId())
                .eventId(ticket.getEventId())
                .build();
    }
}
