import { Component } from '@angular/core';
import { ServiceCategory } from '../../models/service.category';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  filters: Set<ServiceCategory> = new Set();
  ServiceCategory = ServiceCategory;

  constructor(private contentService: ContentService) {}

  onClickFilter(filter: ServiceCategory) {
    if (this.filters.has(filter)) {
      this.filters.delete(filter);
    } else {
      this.filters.add(filter);
    }

    this.contentService.syncContentsByFilter({ categories: Array.from(this.filters) });
  }

}
