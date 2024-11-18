import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AddToCartComponent,CommonModule, ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  producto = {
    nombre: 'Lorem Ipsum', 
    proveedor: 'Proveedor 1',
    precio: 100,
    tipo: false
  };

  constructor(private router: Router
  ) {}

  goToInfoService() {
    this.router.navigate(['/info-service']);
  }
  
}