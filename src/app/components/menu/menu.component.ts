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
  filter?: string;
  ServiceCategory = ServiceCategory;

  constructor(private contentService: ContentService) {
    this.contentService.filterSubject.subscribe(filter => {
      this.filter = filter;
    });
    this.contentService.categoriesSubject.subscribe(categories => {
      this.filters = new Set(categories || []);
    });
  }

  onClickFilter(filter: ServiceCategory) {
    if (this.filters.has(filter)) {
      this.filters.delete(filter);
    } else {
      this.filters.add(filter);
    }

    const categories = this.filters.size !== 0 ? Array.from(this.filters) : undefined;

    this.contentService.syncContentsByFilter({ filter: this.filter, categories });
  }

}
