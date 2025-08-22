import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() teams: Team[] = [];
  @Input() teamSuccessMessage: string = "";
  @Input() editedTeam: Team | null = null;
  newTeam: Team = { name: null, maximumBudget: null };

  @Output() editTeamEvent = new EventEmitter<Team>();
  @Output() saveEditedTeamEvent = new EventEmitter<Team>();
  @Output() cancelEditTeamEvent = new EventEmitter<void>();
  @Output() deleteTeamEvent = new EventEmitter<number>();
  @Output() createTeamEvent = new EventEmitter<Team>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teamSuccessMessage'] && this.teamSuccessMessage) {
      setTimeout(() => {
        this.teamSuccessMessage = "";
      }, 2000);
    }
  }

  onEditTeam(team: Team) { this.editTeamEvent.emit(team); }
  onSaveEditedTeam() { if (this.editedTeam) this.saveEditedTeamEvent.emit(this.editedTeam); this.editedTeam = null; }
  onCancelEditTeam() { this.editedTeam = null; this.cancelEditTeamEvent.emit(); }
  onDeleteTeam(teamid: number) { this.deleteTeamEvent.emit(teamid); }
  createTeam() { this.createTeamEvent.emit(this.newTeam); this.newTeam.name = null; this.newTeam.maximumBudget = null; }

  maxBidStatus() { }

  showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }


}