import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  teams: Team[] = [];
  players: Player[] = [];
  editedPlayer: Player;
  editedTeam: Team;
  playerSuccessMessage: string = "";
  teamSuccessMessage: string = "";
  teamErrorMessage: string = "";
  playerErrorMessage: string = "";
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTeams();
    this.getPlayers();
  }

  getTeams() {
    this.adminService.getTeams().subscribe(data => {
      if (data) {
        this.teams = data;
      }
    })
  }
  createTeam(team: Team) {
    if (team.maximumBudget<0) {
      this.teamErrorMessage="Team Budget is Invalid!"
    }
    this.teams.forEach(currteam => {
        if (currteam.name.toLowerCase()===team.name.toLowerCase()) {
          this.teamErrorMessage="Team Already Exists!"
          return;
        }
      })
    this.adminService.createTeam(team).subscribe(data => {
      if (data) {
        this.teamSuccessMessage = "Team added successfully";
        this.getTeams();
      }
    })
  }
  editTeam(team: Team) {
    this.editedTeam = { id: team.id, name: team.name, maximumBudget: team.maximumBudget };
  }
  saveEditedTeam(team: Team) {
    if (team.maximumBudget<0) {
      this.teamErrorMessage="Team Budget is Invalid!"
    }
    this.adminService.updateTeam(team.id, team).subscribe(data => {
      if (data) {
        this.teamSuccessMessage = "Team updated successfully";
        this.getTeams();
      }
    })
    this.editedTeam = null;
  }
  cancelEditTeam() {
    this.editedTeam = null;

  }
  deleteTeam(teamid: number) {
    this.adminService.deleteTeam(teamid).subscribe(data => {
      if (data) {
        this.teamSuccessMessage = "Team deleted successfully";
        this.getTeams();
      }
    })
  }

  getPlayers() {
    this.adminService.getPlayers().subscribe(data => {
      this.players = data;
    });
  }

  createPlayer(player: Player) {
    if (player.biddingPrice<0) {
      this.playerErrorMessage="Invalid Player Bidding Price."
    }
    this.adminService.createPlayer(player).subscribe(data => {
      if (data) {
        this.playerSuccessMessage = "Player added successfully";
        this.getPlayers();
      }
    })
  }
  editPlayer(player: Player) {
    this.editedPlayer = { id: player.id, name: player.name, age: player.age, category: player.category, biddingPrice: player.biddingPrice, selectedTeamId: null, sold: false, team: null };
  }
  saveEditedPlayer(player: Player) {
    if (player.biddingPrice<0) {
      this.playerErrorMessage="Invalid Player Bidding Price."
    }
    this.adminService.updatePlayer(player.id, player).subscribe(data => {
      if (data) {
        this.playerSuccessMessage = "Player updated successfully";
        this.getPlayers();
      }
    })
    this.editedPlayer = null;
  }
  cancelEditPlayer() {
    this.editedPlayer = null;
  }
  deletePlayer(playerid: number) {
    this.adminService.deletePlayer(playerid).subscribe(data => {
      if (data) {
        this.playerSuccessMessage = "Player deleted successfully";
        this.getPlayers();
      }
    });
  }

}