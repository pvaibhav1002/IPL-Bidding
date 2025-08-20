package me.pvaibhav.springapp.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue
    private long userId;
    private String username;
    private String password;
    private String role;
    @Transient
    private String token = "";

    public User() {
        this.username = "";
        this.password = "";
        this.role = "";
        this.token = "";
    }

    public User(long userId, String username, String password, String role, String token) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.token = token;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
