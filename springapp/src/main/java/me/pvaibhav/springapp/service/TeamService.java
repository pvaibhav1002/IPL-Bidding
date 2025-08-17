package me.pvaibhav.springapp.service;

import java.util.List;

import me.pvaibhav.springapp.entity.Team;

public interface TeamService {
    Team createTeam(Team team);

    Team updateTeam(Long teamId, Team teamDetails);

    List<Team> getAllTeams();

    Team getTeamById(Long teamId);

    boolean deleteTeam(Long teamId);

}
