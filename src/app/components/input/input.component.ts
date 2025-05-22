import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent,} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import {MatMenuModule} from '@angular/material/menu';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatIconModule, MatAutocompleteModule, CommonModule, FormsModule, MatMenuModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  private router: Router = inject(Router);
  private apiService: ApiService = inject(ApiService);
  inputData = inject(SharedDataService).inputData;

  suggestions: any[] = [];
  filteredSuggestions: any[] = [];
  
  people = {
    adults: 0,
    children: 0,
  };

  location!: any;
  startDate: Date = new Date(); 
  endDate: Date = new Date();

  ngOnInit() {
    this.apiService.getSuggestions().subscribe((data: any) => {
      this.suggestions = data;
      this.filteredSuggestions = data;
    });
  }

  onLocationChange() {
   const search = typeof this.location === 'string' ? this.location.toLowerCase() : this.location?.name?.toLowerCase() || '';
   this.filteredSuggestions = this.suggestions.filter(item =>
    item.name.toLowerCase().includes(search)
  );
  }

  increase(type: 'adults' | 'children') {
    this.inputData.people[type]++;
  }

  decrease(type: 'adults' | 'children') {
    if (this.people[type] > 0) {
      this.inputData.people[type]--;
    }
  }

  displayFn(location: any): string {
  return location?.name || '';
}

  search() {
    this.router.navigate(['/search']);
  }
}
