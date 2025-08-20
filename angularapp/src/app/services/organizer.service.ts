import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  public baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUnsoldPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/organizer/unsold-players`);
  }
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team`);
  }
  assignPlayerToTeam(assign: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/organizer/assign-player?playerId=${assign.playerid}&teamId=${assign.teamid}`, {});
  }
  releasePlayerFromTeam(playerid: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/organizer/release-player/${playerid}`, {});
  }
  getPlayerListInTeam(teamid: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/organizer/player-list/${teamid}`);
  }
}