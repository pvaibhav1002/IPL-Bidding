package me.pvaibhav.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ExceedsTeamBudgetException.class)
    public ResponseEntity<Map<String,String>> handleExceedsTeamBudgetException(ExceedsTeamBudgetException etbe) {
        Map<String, String> error = new HashMap<>();
        error.put("message", etbe.getMessage());
        return ResponseEntity.status(500).body(error);
    }

    @ExceptionHandler(PlayerAlreadyAssignedException.class)
    public ResponseEntity<Map<String,String>> handlePlayerAlreadyAssignedException(PlayerAlreadyAssignedException pae) {
        Map<String, String> error = new HashMap<>();
        error.put("message", pae.getMessage());
        return ResponseEntity.status(500).body(error);
    }
    // Catch any other exceptions (optional)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleGeneral(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        return ResponseEntity.status(500).body(error);}
}
