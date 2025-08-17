import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Team[] = [];
  newTeam: Team={name:null,maximumBudget:null};

  @Output() editTeamEvent = new EventEmitter<Team>();
  @Output() saveEditedTeamEvent = new EventEmitter<Team>();
  @Output() cancelEditTeamEvent = new EventEmitter<void>();
  @Output() deleteTeamEvent = new EventEmitter<number>();
  @Output() createTeamEvent = new EventEmitter<Team>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditTeam(team: Team) { this.editTeamEvent.emit(team); }
  onSaveEditedTeam() { this.saveEditedTeamEvent.emit(); }
  onCancelEditTeam() { this.cancelEditTeamEvent.emit(); }
  onDeleteTeam(teamid: number) { this.deleteTeamEvent.emit(teamid); }
  createTeam() { this.createTeamEvent.emit(this.newTeam); }

  maxBidStatus() { }

}
