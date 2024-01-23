package com.major.sem8.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public final ResponseEntity<ErrorResponse> handleAllExceptions(ApplicationException e, WebRequest req) throws Exception{
        ErrorResponse errorResponse = new ErrorResponse(LocalDate.now(),e.getMessage(),req.getDescription(false));
        return new ResponseEntity<>(errorResponse,e.getHttpStatus());
    }
}
