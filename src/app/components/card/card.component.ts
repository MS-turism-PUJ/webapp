import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SweetAlertService } from '../../services/sweetAlertService/sweet-alert-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
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