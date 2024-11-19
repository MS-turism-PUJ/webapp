import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Router } from '@angular/router';

import { Content } from '../../models/content';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AddToCartComponent, CommonModule,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() content!: Content;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart() {
    if (!this.content.service) {
      console.error('No service found');
      return;
    }
    this.cartService.addToCart(this.content.service.serviceId);
  }

  goToInfoService(): void {
    if (this.content.contentId) {
      // Redirige a la ruta con el ID del servicio
      this.router.navigate(['/info-service/', this.content.contentId]);
    } else {
      console.error('No se puede redirigir: El contenido no tiene ID.');
    }
  }

}