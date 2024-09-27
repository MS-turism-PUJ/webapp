import { Component } from '@angular/core';
import { ButtonPayComponent } from "../button-pay/button-pay.component";

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [ButtonPayComponent],
  templateUrl: './cart-shopping.component.html',
  styleUrl: './cart-shopping.component.css'
})
export class CartShoppingComponent {

}
