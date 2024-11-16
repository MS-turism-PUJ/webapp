import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonPayComponent } from './components/button-pay/button-pay.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { DragAndDropFilesComponent } from './components/drag-and-drop-files/drag-and-drop-files.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonPayComponent,RouterOutlet,CardComponent,SearchBarComponent,MenuComponent, CartShoppingComponent,CartItemComponent,GoogleMapsComponent, DragAndDropFilesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webapp';
}
