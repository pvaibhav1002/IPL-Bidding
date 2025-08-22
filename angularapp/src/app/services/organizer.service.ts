import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  public baseUrl = 'https://8080-bebdfbbaeec330669142edeccfaaefdone.premiumproject.examly.io/api';

  constructor(private http: HttpClient) { }

  getUnsoldPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/organizer/unsold-players`);
  }
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team`);
  }
  assignPlayerToTeam(assign: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/organizer/assign-player?playerId=${assign.playerid}&teamId=${assign.teamid}`, {}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>new Error(error.error));
      })
    );
  }
  releasePlayerFromTeam(playerid: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/organizer/release-player/${playerid}`, {});
  }
  getPlayerListInTeam(teamid: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/organizer/player-list/${teamid}`);
  }
}