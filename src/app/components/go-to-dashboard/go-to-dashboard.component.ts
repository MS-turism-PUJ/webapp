import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-go-to-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './go-to-dashboard.component.html',
  styleUrl: './go-to-dashboard.component.css'
})
export class GoToDashboardComponent {

  constructor(private router: Router, private authService: AuthService) { }

  goToDashboard() {
    if (this.authService.getRole() === "PROVIDER") {
      this.router.navigate(['/provider']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
