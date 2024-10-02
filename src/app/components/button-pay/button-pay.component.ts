import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-pay',
  standalone: true,
  imports: [],
  templateUrl: './button-pay.component.html',
  styleUrl: './button-pay.component.css'
})
export class ButtonPayComponent {
  constructor(private router: Router) { }
  goToPayment() {
    this.router.navigate(['/payment']);
  }

}
