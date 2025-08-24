package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.entity.Player;
import com.examly.springapp.service.PlayerService;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
    PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player newPlayer = playerService.addPlayer(player);
        if (newPlayer == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(newPlayer);
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable long playerId, @RequestBody Player player) {
        Player newPlayer = playerService.updatePlayer(playerId, player);
        if (newPlayer == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(newPlayer);
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayer();
        if (players.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(players);
    }
    
    @GetMapping("/{playerId}")
    public ResponseEntity<Player> getPlayer(@PathVariable long playerId) {
        Player newPlayer = playerService.getPlayerById(playerId);
        if (newPlayer==null) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(201).body(newPlayer);
    }
    @DeleteMapping("/{playerId}")
    public ResponseEntity<Boolean> deletePlayer(@PathVariable long playerId) {
        boolean delete=playerService.deletePlayer(playerId);
        if (!delete) {
            return ResponseEntity.status(204).body(false);
        }
        System.out.println(delete);
        return ResponseEntity.status(200).body(true);
    }
}
