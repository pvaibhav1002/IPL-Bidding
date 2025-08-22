package me.pvaibhav.springapp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.pvaibhav.springapp.entity.Player;
import me.pvaibhav.springapp.entity.Team;
import me.pvaibhav.springapp.exception.ExceedsTeamBudgetException;
import me.pvaibhav.springapp.exception.PlayerAlreadyAssignedException;
import me.pvaibhav.springapp.repository.PlayerRepo;
import me.pvaibhav.springapp.repository.TeamRepo;
import me.pvaibhav.springapp.service.OrganizerService;

@Service
public class OrganiserServiceImpl implements OrganizerService {
    PlayerRepo playerRepo;
    TeamRepo teamRepo;

    @Autowired
    public OrganiserServiceImpl(PlayerRepo playerRepo, TeamRepo teamRepo) {
        this.playerRepo = playerRepo;
        this.teamRepo = teamRepo;
    }

    @Override
    public boolean assignPlayertoTeam(long playerId, long teamId) {
        Player player = playerRepo.findById(playerId).orElse(null);
        Team team = teamRepo.findById(teamId).orElse(null);
        System.out.println(player+" "+team);
        if (player == null || team == null) {
            return false;
        }
        if (player.isSold() && player.getTeam() != null) {
            throw new PlayerAlreadyAssignedException("Player already assigned to a team");
        }
        if (team.getMaximumBudget()<player.getBiddingPrice()) {
            throw new ExceedsTeamBudgetException("Exceeds Team Budget");
        }
        team.getPlayers().add(player);
        team.setMaximumBudget(team.getMaximumBudget()-player.getBiddingPrice());
        Team newTeam = teamRepo.save(team);
        player.setTeam(newTeam);
        player.setSold(true);
        playerRepo.save(player);
        return true;
    }

    @Override
    public List<Player> getPlayerListByTeamId(long teamId) {
        Team team = teamRepo.findById(teamId).orElse(null);
        if (team == null)
            return null;
        return team.getPlayers();
    }

    @Override
    public List<Player> getSoldPlayers() {
        List<Player> players= playerRepo.findBySold(true);
        return players;
    }
    
    @Override
    public List<Player> getUnsoldPlayers() {
        List<Player> players= playerRepo.findBySold(false);
        return players;
    }

    @Override
    public boolean releasePlayerFromTeam(long playerId) {
        Player player = playerRepo.findById(playerId).orElse(null);
        if (player==null) {
            return false;
        }
        Team team = teamRepo.findById(player.getTeam().getId()).get();
        team.getPlayers().remove(player);
        team.setMaximumBudget(team.getMaximumBudget()+player.getBiddingPrice());
        teamRepo.save(team);
        player.setTeam(null);
        player.setSold(false);
        playerRepo.save(player);
        return true;
    }

}
