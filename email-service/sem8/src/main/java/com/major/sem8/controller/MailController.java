package com.major.sem8.controller;

import com.major.sem8.entity.Ticket;
import com.major.sem8.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class MailController {

    @Autowired
    private EmailService emailService;

    @KafkaListener(
            topics = "email-event",
            concurrency = "2",
            groupId = "email-processor"
    )
    public void sendEmail(Ticket ticket) throws MessagingException {
        emailService.sendEmail(ticket);
    }

//    @PostMapping("/send")
//    public void sendEmail(@RequestBody Ticket ticket) throws MessagingException {
//        System.out.println(ticket);
//        emailService.sendEmail(ticket);
//    }
}
