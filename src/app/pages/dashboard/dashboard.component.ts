import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CartShoppingComponent } from '../../components/cart-shopping/cart-shopping.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ContentService } from '../../services/content.service';
import { CommonModule } from '@angular/common';
import { Content } from '../../models/content';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent,
    SearchBarComponent,
    MenuComponent,
    CartShoppingComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  contents: Content[] = []; // Cambiar `contents` a `contents` y usar el tipo Producto

  constructor(private contentService: ContentService) {}

  async ngOnInit(): Promise<void> {
    // Llamar al servicio actualizado para obtener la lista de contenidos como contents
    this.contents = await this.contentService.getContents(1, 10);
  }
}
