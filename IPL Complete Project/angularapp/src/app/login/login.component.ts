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
  successMessage = "";

  constructor(private authService: AuthService, private router: Router) { }


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.successMessage = 'Login successful!';
        setTimeout(() => {
          if (res.role == 'ADMIN') {
            this.router.navigate(['/admin']);
          }
          else if (res.role == 'ORGANIZER')
            this.router.navigate(['/organizer']);
          else
            this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = "Invalid Credentials";
        setTimeout(() => this.errorMessage = "", 3000);
      }
    }

    );
  }

  ngOnInit(): void {
  }

}