package com.examly.springapp.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.entity.Team;
import com.examly.springapp.service.TeamService;

@RestController
@RequestMapping("/api")
public class TeamController {
    TeamService teamService;
    List<Team> teams = new ArrayList<>();

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/test/team")
    public List<Team> getTeam() {
        teams.add(new Team());
        teams.add(new Team(1234567L, "CSK", 26348.166));
        return teams;
    }

    @PostMapping("/team")
    public ResponseEntity<Team> addTeam(@RequestBody Team team) {
        Team newTeam = teamService.createTeam(team);
        if (newTeam == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(newTeam);
    }

    @PutMapping("/team/{teamId}")
    public ResponseEntity<Team> updateTeam(@PathVariable long teamId, @RequestBody Team team) {
        Team newTeam = teamService.updateTeam(teamId, team);
        if (newTeam == null) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(201).body(newTeam);
    }

    @GetMapping("/team")
    public ResponseEntity<List<Team>> getAllTeam() {
        List<Team> teams = teamService.getAllTeams();
        if (teams.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(teams);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<Team> getTeamById(@PathVariable long teamId) {
        Team newTeam = teamService.getTeamById(teamId);
        if (newTeam == null) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(newTeam);
    }

    @DeleteMapping("/team/{teamId}")
    public ResponseEntity<Boolean> deleteTeam(@PathVariable long teamId) {
        
        if (!teamService.deleteTeam(teamId)) {
            return ResponseEntity.status(204).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }
}
