package com.major.sem8.controller;

import com.major.sem8.dto.RazorpayResponse;
import com.major.sem8.entity.Payment;
import com.major.sem8.entity.Ticket;
import com.major.sem8.service.PaymentService;
import com.razorpay.RazorpayException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/payment")
public class PaymentController {


    @Autowired
    private PaymentService paymentService;

    private static final Logger LOG = LoggerFactory.getLogger(PaymentController.class);

    @KafkaListener(
            topics = "ticket-event",
            groupId = "ticket-proccesor",
            concurrency = "2"
    )
    public void TicketEventConsumer(Ticket ticket) throws RazorpayException {
        LOG.info("Received -> {}",ticket);
        paymentService.createOrderWithRazorpay(ticket);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody RazorpayResponse razrorpayResp) throws RazorpayException {
        return new ResponseEntity<>(paymentService.verifyPayment(razrorpayResp),HttpStatus.OK);
    }

    @GetMapping(value = "/orderId/{ticketId}")
    public SseEmitter getOrderId(@PathVariable("ticketId") String ticketId) throws IOException {
        SseEmitter sseEmitter = new SseEmitter();
        Payment order = paymentService.getOrderId(ticketId);

        sseEmitter.send(SseEmitter.event().name("order").data(order,MediaType.APPLICATION_JSON));

        return sseEmitter;
    }
}
