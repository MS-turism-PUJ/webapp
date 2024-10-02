import { Component, OnInit } from '@angular/core'
import { ButtonPayComponent } from '../button-pay/button-pay.component'
import { CartItemComponent } from '../cart-item/cart-item.component'
import { CartService } from '../../services/cart.service'
import { CommonModule, NgFor } from '@angular/common'

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [ButtonPayComponent, CartItemComponent, NgFor, CommonModule],
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css'],
})
export class CartShoppingComponent implements OnInit {
  cartItems: any[] = []
  dataQuantity: number = 0
  totalAmount: number = 0

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items
      console.log('Items en el carrito:', this.cartItems.length)
      this.updateCartQuantity()
      this.calculateTotalAmount()
    })
  }

  updateCartQuantity() {
    this.dataQuantity = this.cartItems.length
  }

  // Método para eliminar un item del carrito
  onEliminarItem(item: any) {
    const index = this.cartItems.indexOf(item)
    if (index > -1) {
      this.cartItems.splice(index, 1)
      this.updateCartQuantity()
    }

    this.cartService.updateCartItems(this.cartItems)
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.precio, 0)
  }
}
