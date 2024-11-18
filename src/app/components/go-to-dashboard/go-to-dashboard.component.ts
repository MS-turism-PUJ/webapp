import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './go-to-dashboard.component.html',
  styleUrl: './go-to-dashboard.component.css'
})
export class GoToDashboardComponent {

  constructor(private router: Router) {
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);

  }
}
