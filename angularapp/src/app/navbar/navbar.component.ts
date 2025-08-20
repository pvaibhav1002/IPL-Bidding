import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin = false;
  isAdmin = false;
  isOrganizer = false;
  constructor(private router :Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.role$.subscribe(role=>{
      this.isLoggedin = !!role;
      this.isAdmin = role === 'ADMIN';
      this.isOrganizer = role === 'ORGANIZER';

    })
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedin = this.isAdmin = this.isOrganizer = false;
    this.router.navigate(['/login']);
  }

}