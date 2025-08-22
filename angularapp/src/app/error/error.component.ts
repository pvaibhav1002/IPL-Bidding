import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() error?= { 
    status: "404 NOT FOUND", 
    message: "We can't find that page. Please check the URL or return to the homepage!" 
  };

  countdown: number = 5; 

  constructor(private router: Router) {}

  ngOnInit(): void {

    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.goHome();
      }
    }, 1000);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}