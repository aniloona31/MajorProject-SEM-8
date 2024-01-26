package com.major.sem8.service;

import com.major.sem8.dto.TicketResponse;
import com.major.sem8.entity.Ticket;
import com.major.sem8.exception.ApplicationException;
import com.major.sem8.proxy.PlaceProxy;
import com.major.sem8.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PlaceProxy placeProxy;

    private Double getTicketPrice(Long placeId){
        try{
            Double price = placeProxy.getPrice(placeId).getBody();
            return price;
        }catch (Exception e){
            throw new ApplicationException("UNABLE TO FETCH PRICE",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public TicketResponse buyTicket(Ticket details){
        Double singleTicketPrice = getTicketPrice(details.getPlaceId());
        try{
            details.setPrice(details.getQuantity()*singleTicketPrice);
            String ticketId = UUID.randomUUID().toString();
            details.setTicketId(ticketId);
            details.setConfirmation(false);
            Ticket ticket = ticketRepository.save(details);
            return mapToDto(ticket);
        }catch(Exception e){
            throw new ApplicationException("error while generating ticket", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<TicketResponse> getAllTicketsByUser(String email){
        try{
            List<Ticket> tickets = ticketRepository.findAllByEmail(email);
            return tickets.stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new ApplicationException("couldn't get tickets for the user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    protected TicketResponse mapToDto(Ticket ticket){
        return TicketResponse.builder()
                .ticketId(ticket.getTicketId())
                .price(ticket.getPrice())
                .confirmation(ticket.isConfirmation())
                .bookedDates(ticket.getBookedDates())
                .quantity(ticket.getQuantity())
                .placeName(ticket.getPlaceName())
                .build();
    }
}
