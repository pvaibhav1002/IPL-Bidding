import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: NgForm;
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }


  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      if (!res) {
        this.errorMessage = "Invalid credentials or role mismatch.";
        return;
      }
      if (res.role == 'ADMIN') {
        this.router.navigate(['/admin']);
      }
      else if (res.role == 'ORGANIZER')
        this.router.navigate(['/organizer']);
      else
        this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }

}