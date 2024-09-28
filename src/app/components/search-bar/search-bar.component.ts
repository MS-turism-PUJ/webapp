import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText: string = '';

  onInputChange() {
    // This method can be used for additional logic when input changes
  }

  onSearch() {
    // Implement your search functionality here
    console.log('Searching for:', this.searchText);
  }
}
