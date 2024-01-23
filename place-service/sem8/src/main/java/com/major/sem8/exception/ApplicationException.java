package com.major.sem8.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationException extends RuntimeException{

    private String message;
    private HttpStatus httpStatus;

}
