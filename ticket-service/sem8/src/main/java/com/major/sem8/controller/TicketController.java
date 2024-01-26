package com.major.sem8.controller;

import com.major.sem8.dto.TicketResponse;
import com.major.sem8.entity.Ticket;
import com.major.sem8.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/buy")
    public ResponseEntity<TicketResponse> buyTicket(@RequestBody Ticket details){
        return new ResponseEntity<>(ticketService.buyTicket(details), HttpStatus.OK);
    }

    @GetMapping("/all/user")
    public ResponseEntity<List<TicketResponse>> getAllTicketsByUser(@RequestParam("email") String email){
        return new ResponseEntity<>(ticketService.getAllTicketsByUser(email),HttpStatus.OK);
    }
}
