import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  imports: [CommonModule]
})
export class CartItemComponent {
  @Input() id: number = 0;
  @Input() nombre: string = '';  
  @Input() proveedor: string = '';
  @Input() precio: number = 0;

  constructor(private cartService: CartService, private sweetAlertService: SweetAlertService) {}
  
  onEliminar() {
    this.cartService.removeItem(this.id);
    this.sweetAlertService.mostrarCorrectamente('Producto eliminado');
  }
}
