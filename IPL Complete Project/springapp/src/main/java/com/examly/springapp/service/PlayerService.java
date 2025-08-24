package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Player;

public interface PlayerService {
    Player addPlayer(Player player);

    Player updatePlayer(long playerId, Player playerDetails);

    List<Player> getAllPlayer();

    Player getPlayerById(long playerId);

    boolean deletePlayer(long playerId);
}
