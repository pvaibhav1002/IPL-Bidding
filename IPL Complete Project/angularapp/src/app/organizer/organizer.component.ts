import { Component, OnInit} from '@angular/core';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';
import { OrganizerService } from '../services/organizer.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  teams: Team[] = [];
  unsoldPlayers: Player[] = [];
  categories: string[] = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
  selectedCategory: string = 'All';
  selectedTeamid: number | null = null;
  showList: { [key: number]: boolean } = {};
  successMessage = "";
  errorMessage = "";
  constructor(private organizerService: OrganizerService) { }

  ngOnInit(): void {
    this.loadUnsoldPlayers();
    this.loadTeams();
  }

  loadUnsoldPlayers(): void {
    this.organizerService.getUnsoldPlayers().subscribe(players => {
      this.unsoldPlayers = players;
    });
  }

  loadTeams(): void {
    this.organizerService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }
  filterByCategory(): Player[] {
    if (this.selectedCategory == 'All') {
      return this.unsoldPlayers;
    }
    return this.unsoldPlayers.filter(p => p.category === this.selectedCategory);
  }

  togglePlayerList(teamid: number): void {
    this.showList[teamid] = !this.showList[teamid];
    this.getPlayerListInTeam(teamid);
  }

  getPlayerListInTeam(teamid: number) {
    this.organizerService.getPlayerListInTeam(teamid).subscribe(players => {
      this.teams = this.teams.map(t =>
        t.id === teamid ? { ...t, players: players ?? [] } : t
      );
    });
  }

  assignPlayerToTeam(playerid: number, teamid: number | null): void {
    if (!teamid) return;
    let currteam: Team;
    this.teams.forEach(team => {
      if (team.id === teamid) {
        currteam = team;
      }
    })
    this.organizerService.assignPlayerToTeam({ playerid, teamid }).subscribe({
      next: () => {
        this.unsoldPlayers = this.unsoldPlayers.filter(p => p.id !== playerid);
        this.successMessage = `Player assigned successfully to team ${currteam.name}!`;
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000)
        this.loadTeams();
        this.getPlayerListInTeam(teamid);
      },
      error: (err) => {
        this.errorMessage = `Team Budget of team ${currteam.name} Exceeds`;
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000)
      }
    });
  }

  releasePlayerFromTeam(playerid: number, teamid: number): void {
    this.organizerService.releasePlayerFromTeam(playerid).subscribe(() => {
      this.teams.forEach(team => {
        if (team.id === teamid) {
          team.players.forEach(player => {
            if (player.id === playerid) {
              team.maximumBudget += player.biddingPrice;
            }
          })
          team.players = team.players.filter(p => p.id != playerid);
        }
      })
      this.loadUnsoldPlayers();
    });
  }

}