import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CardComponent } from '../../components/card/card.component'
import { MenuComponent } from '../../components/menu/menu.component'
import { CartShoppingComponent } from '../../components/cart-shopping/cart-shopping.component'
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { ButtonPayComponent } from '../../components/button-pay/button-pay.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonPayComponent,
    RouterOutlet,
    CardComponent,
    SearchBarComponent,
    MenuComponent,
    CartShoppingComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
