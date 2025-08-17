package me.pvaibhav.springapp.entity;

import jakarta.persistence.*;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String category;
    private double biddingPrice;
    private boolean sold;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    public Player() {
        this.name = "";
        this.category = "";
    }

    public Player(Long id, String name, int age, String category, double biddingPrice, boolean sold) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.category = category;
        this.biddingPrice = biddingPrice;
        this.sold = sold;
    }

    public Player(Long id, String name, int age, String category, double biddingPrice, boolean sold, Team team) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.category = category;
        this.biddingPrice = biddingPrice;
        this.sold = sold;
        this.team = team;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getBiddingPrice() {
        return biddingPrice;
    }

    public void setBiddingPrice(double biddingPrice) {
        this.biddingPrice = biddingPrice;
    }

    public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }

}
