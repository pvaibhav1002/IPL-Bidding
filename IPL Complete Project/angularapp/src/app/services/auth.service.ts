import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/models/user.model';
import { catchError, map } from 'rxjs/operators';


export const AUTHENTICATED_USER = 'authenticatedUser';
export const TOKEN = 'token';
export const PAGE_ID = 'pageId';
export const USER_ID = 'userId';
export const ROLE = 'role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = 'http://localhost:8080/api';
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem(ROLE));
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, { username, password, role }).pipe(
      catchError(err => {
        return throwError(() => new Error());
      })
    );
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/login`, { username, password }).pipe(
      map(
        data => {
          localStorage.setItem(USER_ID, "" + data.id);
          localStorage.setItem(AUTHENTICATED_USER, username);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          localStorage.setItem(ROLE, data.role);
          this.roleSubject.next(data.role);
          return data;
        }
      ),
      catchError(err => {
        return throwError(() => new Error());
      })
    );
  }
  getRole(): string {
    return this.getAuthenticatedRole();
  }

  isLoggedin(): boolean {
    let user = localStorage.getItem(AUTHENTICATED_USER);
    return !(user == null);
  }
  logout(): void {
    this.roleSubject.next(null);
    localStorage.clear();
  }
  isAdmin(): boolean { return this.getAuthenticatedRole() === 'ADMIN'; }
  isOrganizer(): boolean { return this.getAuthenticatedRole() === 'ORGANIZER'; }




  getAuthenticatedUserId(): number {
    return parseInt(localStorage.getItem(USER_ID) || "0");
  }

  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedRole() {
    return localStorage.getItem(ROLE);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return localStorage.getItem(TOKEN);
  }


  pageId(): string {
    var pageId = localStorage.getItem(PAGE_ID);
    if (pageId === null) {
      localStorage.setItem(PAGE_ID, 'login');
    }
    return pageId;
  }

  setPageId(pageId: string) {
    localStorage.setItem(PAGE_ID, pageId);
  }

}
