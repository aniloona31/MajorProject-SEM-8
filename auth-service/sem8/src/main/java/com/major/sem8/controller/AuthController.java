package com.major.sem8.controller;

import com.major.sem8.dto.AuthRequest;
import com.major.sem8.entity.User;
import com.major.sem8.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;


    @PostMapping("/register")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        return new ResponseEntity<String>(service.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> getToken(@RequestBody AuthRequest authRequest) {
        return new ResponseEntity<String>(service.login(authRequest),HttpStatus.OK);
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        boolean valid = service.validateToken(token);
        return "Token is valid";
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable("email") String email){
        return new ResponseEntity<>(service.verifyEmail(email),HttpStatus.OK);
    }

}
