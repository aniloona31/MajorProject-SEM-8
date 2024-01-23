package com.major.sem8.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private LocalDate timestamp;
    private String message;
    private String details;
}
