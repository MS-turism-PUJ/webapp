import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Router } from '@angular/router';

import { Producto } from '../../models/Producto';
import { CartItem } from '../../models/CartItem';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AddToCartComponent, CommonModule,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() producto!: Producto;

  constructor(private cartService: CartService, private router: Router
  ) { }

  addToCart() {
    const cartItem: CartItem = {
      nombre: this.producto.nombre,
      precio: this.producto.precio || 0,
    };
    this.cartService.addToCart(cartItem);
  }

  goToInfoService() {
    this.router.navigate(['/info-service']);
  }

}