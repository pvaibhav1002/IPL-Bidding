package com.examly.springapp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Team;
import com.examly.springapp.repository.TeamRepo;
import com.examly.springapp.service.TeamService;

@Service
public class TeamServiceImpl implements TeamService {

    TeamRepo teamRepo;

    @Autowired
    public TeamServiceImpl(TeamRepo teamRepo) {
        this.teamRepo = teamRepo;
    }

    @Override
    public Team createTeam(Team team) {
        return teamRepo.save(team);
    }

    @Override
    public Team updateTeam(Long teamId, Team teamDetails) {
        Optional<Team> optTeam = teamRepo.findById(teamId);
        if (optTeam.isPresent()) {
            Team team = optTeam.get();
            team.setName(teamDetails.getName());
            team.setMaximumBudget(teamDetails.getMaximumBudget());
            return teamRepo.save(team);
        }
        return null;
    }

    @Override
    public boolean deleteTeam(Long teamId) {
        Optional<Team> optTeam = teamRepo.findById(teamId);
        if (optTeam.isPresent()) {
           teamRepo.deleteById(teamId);
            return true;
        }
        return false;
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepo.findAll();
    }

    @Override
    public Team getTeamById(Long teamId) {
        Optional<Team> optTeam = teamRepo.findById(teamId);
        if (optTeam.isPresent()) {
            return optTeam.get();
        }
        return null;
    }

    
}
