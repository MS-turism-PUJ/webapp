import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ContentService } from '../../services/content.service';
import { LoaderComponent } from '../loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, LoaderComponent, NgIf],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText: string = '';
  previousTimeout: any;
  loading: boolean = false;

  constructor(private contentService: ContentService) {}

  onInputChange() {
    this.loading = true;
    clearTimeout(this.previousTimeout);
    this.previousTimeout = setTimeout(async () => {
      await this.onSearch();
    }, 300);
  }
  
  async onSearch() {
    await this.contentService.syncContentsByFilter(this.searchText, []);
    this.loading = false;
  }
}
