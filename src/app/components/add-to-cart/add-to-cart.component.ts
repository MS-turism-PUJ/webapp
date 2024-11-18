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
  @Input() service!: Service;

  constructor(private cartService: CartService, private sweetAlertService: SweetAlertService,
  ) {}

  addToCart() {
    this.cartService.addToCart(this.service);
  }
  mostrarAlerta() {
    this.sweetAlertService.mostrarCorrectamente('Servicio agregado');
  }
}
