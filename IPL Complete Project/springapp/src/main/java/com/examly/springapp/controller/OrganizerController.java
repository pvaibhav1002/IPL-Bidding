package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.entity.Player;
import com.examly.springapp.service.OrganizerService;

@RestController
@RequestMapping("/api/organizer")
public class OrganizerController {
    OrganizerService organizerService;

    @Autowired
    public OrganizerController(OrganizerService organizerService) {
        this.organizerService = organizerService;
    }

    @PostMapping("/assign-player")
    public ResponseEntity<Boolean> assignPlayer(@RequestParam long playerId,@RequestParam long teamId) {
        System.out.println(playerId+" "+teamId);
        if (!organizerService.assignPlayertoTeam(playerId, teamId)) {
            return ResponseEntity.status(500).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }

    @GetMapping("/unsold-players")
    public ResponseEntity<List<Player>> getUnsoldPlayers() {
        List<Player> players = organizerService.getUnsoldPlayers();
        if (players.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(players);
    }
    
    @GetMapping("/sold-players")
    public ResponseEntity<List<Player>> getSoldPlayers() {
        List<Player> players = organizerService.getSoldPlayers();
        if (players.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(players);

    }

    @PutMapping("/release-player/{playerId}")
    public ResponseEntity<Boolean> releasePlayer(@PathVariable long playerId) {
        if (!organizerService.releasePlayerFromTeam(playerId)) {
            return ResponseEntity.status(500).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }

    @GetMapping("/player-list/{teamId}")
    public ResponseEntity<List<Player>> getPlayerList(@PathVariable long teamId) {
        List<Player> players = organizerService.getPlayerListByTeamId(teamId);
        if (players.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(201).body(players);
    }
}
