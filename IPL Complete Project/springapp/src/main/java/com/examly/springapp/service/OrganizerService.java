package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Player;

public interface OrganizerService {
    List<Player> getUnsoldPlayers();

    List<Player> getSoldPlayers();

    boolean assignPlayertoTeam(long playerId, long teanId);

    boolean releasePlayerFromTeam(long playerId);

    List<Player> getPlayerListByTeamId(long team);
}
