import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  teams:Team[]=[];
  players:Player[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  getTeams() { }
  createTeam(team: Team) { }
  editTeam(team: Team) { }
  saveEditedTeam() { }
  cancelEditTeam() { }
  deleteTeam(teamid: number) { }

  getPlayers() { }
  createPlayer(player: Player) { }
  editPlayer(player: Player) { }
  saveEditedPlayer() { }
  cancelEditPlayer() { }
  deletePlayer(playerid: number) { }

}
