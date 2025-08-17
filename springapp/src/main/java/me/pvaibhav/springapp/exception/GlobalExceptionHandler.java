package me.pvaibhav.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ExceedsTeamBudgetException.class)
    public ResponseEntity<String> handleExceedsTeamBudgetException(ExceedsTeamBudgetException etbe) {
        return ResponseEntity.status(500).body(etbe.getMessage());
    }

    @ExceptionHandler(PlayerAlreadyAssignedException.class)
    public ResponseEntity<String> handlePlayerAlreadyAssignedException(PlayerAlreadyAssignedException pae) {
        return ResponseEntity.status(500).body(pae.getMessage());
    }
}
