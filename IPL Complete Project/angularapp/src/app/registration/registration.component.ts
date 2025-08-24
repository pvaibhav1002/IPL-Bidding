import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrtion: NgForm;
  username = '';
  password = '';
  role = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(form: NgForm) {
    if (form.invalid ) {
      this.errorMessage = "Username & Password is required."
      return;
    }
    if(this.role==''){
      this.errorMessage = "Role is required."
      return;
    }
    this.authService.register(this.username, this.password, this.role).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.errorMessage = "Username already exists";
        setTimeout(() => this.errorMessage = "", 3000);
      }
    });
  }

  ngOnInit(): void {
  }

}