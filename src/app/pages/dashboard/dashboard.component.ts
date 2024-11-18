import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CartShoppingComponent } from '../../components/cart-shopping/cart-shopping.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ButtonPayComponent } from '../../components/button-pay/button-pay.component';
import { WeatherComponent } from '../../components/weather/weather.component';
import { ContentService } from '../../services/content.service';
import { Producto } from '../../models/Producto'; // Importar el modelo Producto
import { CommonModule } from '@angular/common';

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
    WeatherComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = []; // Cambiar `contents` a `productos` y usar el tipo Producto

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    // Llamar al servicio actualizado para obtener la lista de contenidos como Productos
    this.contentService.getContents(1, 10).subscribe({
      next: (data: Producto[]) => {
        this.productos = data; // Asignar la lista de productos al array
      },
      error: (err) => console.error('Error fetching contents:', err),
    });
  }
}
