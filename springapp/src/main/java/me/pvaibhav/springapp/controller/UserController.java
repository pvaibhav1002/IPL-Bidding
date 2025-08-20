package me.pvaibhav.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import me.pvaibhav.springapp.entity.User;
import me.pvaibhav.springapp.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        User newuser = userService.registerUser(user);
        if (newuser==null) {
            return ResponseEntity.status(409).body("User already exists");
        }
        return ResponseEntity.status(201).body(newuser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        User newuser = userService.loginUser(user);
        if (newuser==null) {
            return ResponseEntity.status(401).body("Invalid Username or Password.");
        }
        return ResponseEntity.status(201).body(newuser);
    }
    @GetMapping
    public ResponseEntity<?> getAllUser(){
        List<User> users = userService.getAllUser();
        if (users.isEmpty()) {
            return ResponseEntity.status(404).body("No user found.");
        }
        return ResponseEntity.status(201).body(users);
    }
}
