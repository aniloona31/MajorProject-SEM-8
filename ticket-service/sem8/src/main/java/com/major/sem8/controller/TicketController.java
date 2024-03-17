package com.major.sem8.controller;

import com.google.zxing.WriterException;
import com.major.sem8.entity.Payment;
import com.major.sem8.dto.TicketResponse;
import com.major.sem8.entity.Ticket;
import com.major.sem8.service.QRService;
import com.major.sem8.service.TicketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private QRService qrService;

    private static Logger LOG = LoggerFactory.getLogger(TicketController.class);

    @PostMapping("/buy")
    public ResponseEntity<TicketResponse> buyTicket(@RequestBody Ticket details){
        return new ResponseEntity<>(ticketService.buyTicket(details), HttpStatus.OK);
    }

    @GetMapping("/all/user")
    public ResponseEntity<List<TicketResponse>> getAllTicketsByUser(@RequestHeader("X-Email") String email){
        return new ResponseEntity<>(ticketService.getAllTicketsByUser(email),HttpStatus.OK);
    }

    @GetMapping("/QR")
    public ResponseEntity<byte[]> getQRForTicket(@RequestParam("ticketId") String ticketId) throws IOException, WriterException {
        return new ResponseEntity<>(qrService.generateQRCodeImage(ticketId),HttpStatus.OK);
    }

    @KafkaListener(
            topics = "payment-event",
            groupId = "payment-proccesor",
            concurrency = "2"
    )
    public void paymentEventConsumer(Payment payment){
        LOG.info("Received -> {}",payment);
        ticketService.processPaymentStatus(payment);
    }
}
