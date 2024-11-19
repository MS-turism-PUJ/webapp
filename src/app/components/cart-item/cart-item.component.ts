import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { Service } from '../../models/service';
import { ServiceCategory } from '../../models/service.category';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  imports: [CommonModule]
})
export class CartItemComponent {
  @Input() service: Service = {
    serviceId: '',
    name: '', price: 0, description: '',
    city: '',
    country: '',
    category: ServiceCategory.ALIMENTATION,
    user: {
      userId: 0,
      name: '',
      email: '',
      username: ''
    }
  };

  constructor(private cartService: CartService, private sweetAlertService: SweetAlertService) {}
  
  onEliminar() {
    this.cartService.removeItem(this.service.serviceId);
    this.sweetAlertService.mostrarCorrectamente('Producto eliminado');
  }
}
