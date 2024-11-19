import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { LoaderComponent } from '../loader/loader.component';
import { NgIf } from '@angular/common';
import { ServiceCategory } from '../../models/service.category';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, LoaderComponent, NgIf],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  previousTimeout: any;
  loading: boolean = false;
  searchText?: string;
  categories?: ServiceCategory[];
  lessThan?: number;
  moreThan?: number;

  constructor(private contentService: ContentService) {
    this.contentService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
    this.contentService.categoriesSubject.subscribe((categories) => {
      this.categories = categories;
    });
    this.contentService.lessThanSubject.subscribe((lessThan) => {
      this.lessThan = lessThan;
    });
    this.contentService.moreThanSubject.subscribe((moreThan) => {
      this.moreThan = moreThan;
    });
  }

  onInputChange() {
    this.loading = true;
    clearTimeout(this.previousTimeout);
    this.previousTimeout = setTimeout(async () => {
      await this.onSearch();
    }, 300);
  }

  async onSearch() {
    await this.contentService.syncContentsByFilter({
      filter: this.searchText,
      categories: this.categories,
      lessThan: this.lessThan,
      moreThan: this.moreThan
    });
  }
}
