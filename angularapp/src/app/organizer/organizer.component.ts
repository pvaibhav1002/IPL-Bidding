import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  teams: Team[] = [];
  players: Player[] = [];
  unsoldPlayers:Player[] = [];
  categories:string[] = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
  selectedCategory: string = 'All';
  selectedTeamid: number | null = null;
  showList:{ [key: number]: boolean } = {};
  assign={teamid:null,playerid:null};
  constructor() { }

  ngOnInit(): void {
    this.fetchUnsoldPlayers();
  }

  fetchUnsoldPlayers(){
    this.unsoldPlayers = this.players.filter(p => !p.sold);
  }

  filterByCategory(): Player[] {
    if (this.selectedCategory='All') {
      return this.unsoldPlayers;
    }
    return this.unsoldPlayers.filter(p => p.category === this.selectedCategory);
  }

  togglePlayerList(teamid: number): void {
    this.showList[teamid] = !this.showList[teamid];
  }

  assignPlayerToTeam(): void {
    
  }

  getPlayerListInTeam(teamid: number): Player[] {
    return this.players.filter(p => p.selectedTeamid === teamid && p.sold);
  }

  releasePlayerFromTeam(playerid: number): void {
    
    this.fetchUnsoldPlayers();
  }
}
