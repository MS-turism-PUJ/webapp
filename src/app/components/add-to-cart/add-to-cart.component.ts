import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { Service } from '../../models/service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  @Input() serviceId: string = '';

  constructor(private cartService: CartService, private sweetAlertService: SweetAlertService) {}

  async addToCart() {
    await this.cartService.addToCart(this.serviceId);
    this.sweetAlertService.mostrarCorrectamente('Servicio agregado');
  }
}
