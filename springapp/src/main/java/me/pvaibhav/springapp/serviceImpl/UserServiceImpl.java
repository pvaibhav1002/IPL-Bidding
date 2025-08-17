package me.pvaibhav.springapp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import me.pvaibhav.springapp.configuration.JwtService;
import me.pvaibhav.springapp.entity.User;
import me.pvaibhav.springapp.repository.UserRepo;
import me.pvaibhav.springapp.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    UserRepo userRepo;
    BCryptPasswordEncoder passwordEncoder;
    JwtService jwtService;
    AuthenticationManager authenticationManager;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder,JwtService jwtService,AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;

    }

    @Override
    public User registerUser(User user) {
        if (!userRepo.existsByUsername(user.getUsername())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        }
        return null;
    }

    @Override
    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    @Override
    public User loginUser(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(user.getUsername());
            User returnUser = userRepo.findByUsername(user.getUsername()).get(); 
            // returnUser.set(token); 
            System.out.println("Token: " + token);
            return returnUser;
        }
        return null;

    }
}
