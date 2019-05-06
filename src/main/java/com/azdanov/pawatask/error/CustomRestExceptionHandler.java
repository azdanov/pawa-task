package com.azdanov.pawatask.error;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleAll(Exception ex) {
        ApiError apiError =
                new ApiError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        ex.getLocalizedMessage(),
                        "error occurred");

        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }
}
