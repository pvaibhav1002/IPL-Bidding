package com.examly.springapp.exception;

public class ExceedsTeamBudgetException extends RuntimeException{
    public ExceedsTeamBudgetException(String message){
        super(message);
    }
}
