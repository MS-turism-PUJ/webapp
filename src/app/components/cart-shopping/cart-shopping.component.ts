import { Component, OnInit } from '@angular/core'
import { ButtonPayComponent } from '../button-pay/button-pay.component'
import { CartItemComponent } from '../cart-item/cart-item.component'
import { CartService } from '../../services/cart.service'
import { CommonModule, NgFor } from '@angular/common'
import { Service } from '../../models/service'
import { Payment } from '../../models/payment'

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [ButtonPayComponent, CartItemComponent, NgFor, CommonModule],
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css'],
})
export class CartShoppingComponent implements OnInit {
  payment: Payment = {
    paymentId: '',
    totalAmount: 0,
    user: {
      userId: 0,
      name: '',
      email: '',
      username: ''
    },
    paid: false,
    services: []
  }

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    this.payment = await this.cartService.getCartItems()
  }

  onEliminarItem(item: Service) {
    this.cartService.removeItem(item.serviceId)
  }
}
