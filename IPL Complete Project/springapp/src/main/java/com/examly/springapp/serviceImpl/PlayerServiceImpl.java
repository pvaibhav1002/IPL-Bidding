package com.examly.springapp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Player;
import com.examly.springapp.repository.PlayerRepo;
import com.examly.springapp.service.PlayerService;

@Service
public class PlayerServiceImpl implements PlayerService {
    PlayerRepo playerRepo;

    @Autowired
    public PlayerServiceImpl(PlayerRepo playerRepo) {
        this.playerRepo = playerRepo;
    }

    @Override
    public Player addPlayer(Player player) {
        return playerRepo.save(player);
    }

    @Override
    public boolean deletePlayer(long playerId) {
        Optional<Player> optPlayer = playerRepo.findById(playerId);
        if (optPlayer.isPresent()) {
            playerRepo.deleteById(playerId);
            return true;
        }
        return false;
    }

    @Override
    public List<Player> getAllPlayer() {
        return playerRepo.findAll();
    }

    @Override
    public Player getPlayerById(long playerId) {
        Optional<Player> optPlayer = playerRepo.findById(playerId);
        if (optPlayer.isPresent()) {
            return optPlayer.get();
        }
        return null;
    }

    @Override
    public Player updatePlayer(long playerId, Player playerDetails) {
        Optional<Player> optPlayer = playerRepo.findById(playerId);
        if (optPlayer.isPresent()) {
            Player player = optPlayer.get();
            player.setAge(playerDetails.getAge());
            player.setBiddingPrice(playerDetails.getBiddingPrice());
            player.setCategory(playerDetails.getCategory());
            player.setName(playerDetails.getName());
            player.setSold(playerDetails.isSold());
            return playerRepo.save(player);
        }
        return null;
    }

}
