package me.pvaibhav.springapp.exception;

public class PlayerAlreadyAssignedException extends RuntimeException{
    public PlayerAlreadyAssignedException(String message){
        super(message);
    }
}
