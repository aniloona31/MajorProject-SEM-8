package com.major.sem8.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    private Long id;

    private String username;

    private String email;

    private String password;

    private String phoneNumber;

    private boolean isEnabled;

    private LocalDateTime timestamp;
}

