import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  producto = {
    nombre: 'Lorem Ipsum', 
    proveedor: 'Proveedor 1',
    precio: 100
  };

  constructor(private cartService: CartService, private sweetAlertService: SweetAlertService,
  ) {}

  addToCart() {
    this.cartService.addToCart(this.producto);
  }
  mostrarAlerta() {
    this.sweetAlertService.mostrarCorrectamente('Servicio agregado');
  }
}
