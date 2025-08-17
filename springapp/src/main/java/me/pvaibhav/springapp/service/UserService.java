package me.pvaibhav.springapp.service;

import java.util.List;

import me.pvaibhav.springapp.entity.User;

public interface UserService {
    User registerUser(User user);

    List<User> getAllUser();

    User loginUser(User user);

}
