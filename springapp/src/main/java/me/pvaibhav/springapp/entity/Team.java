package me.pvaibhav.springapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double maximumBudget;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Player> players;

    public Team() {
        this.name = "";
    }

    public Team(Long id, String name, double maximumBudget) {
        this.id = id;
        this.name = name;
        this.maximumBudget = maximumBudget;
    }

    public Team(Long id, String name, double maximumBudget, List<Player> players) {
        this.id = id;
        this.name = name;
        this.maximumBudget = maximumBudget;
        this.players = players;
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

    public double getMaximumBudget() {
        return maximumBudget;
    }

    public void setMaximumBudget(double maximumBudget) {
        this.maximumBudget = maximumBudget;
    }

    @JsonIgnore
    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    @Override
    public String toString() {
        return "Team [id=" + id + ", name=" + name + ", maximumBudget=" + maximumBudget + "]";
    }

}
