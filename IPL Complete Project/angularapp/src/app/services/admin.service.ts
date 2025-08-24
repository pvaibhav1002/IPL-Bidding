import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> { return this.http.get<Team[]>(`${this.baseUrl}/team`); }
  createTeam(team: Team): Observable<Team> { return this.http.post<Team>(`${this.baseUrl}/team`, team); }
  updateTeam(teamid: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/team/${teamid}`, team);
  }
  deleteTeam(teamid: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/team/${teamid}`); }

  getPlayers(): Observable<Player[]> { return this.http.get<Player[]>(`${this.baseUrl}/player`); }
  createPlayer(player: Player): Observable<Player> { return this.http.post<Player>(`${this.baseUrl}/player`, player); }
  updatePlayer(playerid: number, player: Player): Observable<Player> { return this.http.put<Player>(`${this.baseUrl}/player/${playerid}`, player); }
  deletePlayer(playerid: number): Observable<boolean> { return this.http.delete<boolean>(`${this.baseUrl}/player/${playerid}`); }

}