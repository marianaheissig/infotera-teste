import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon, MatSliderModule, MatExpansionModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
filters = {
    name: '',
    minPrice: 0,
    maxPrice: 1000,
    stars: [] as number[]
  };

  @Output() apply = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() starOptions: any[] = [];

  clearFilter() {
    this.filters = { name: '', minPrice: 0, maxPrice: 1000, stars: [] };
    this.close.emit();
  }

  toggleStar(starValue: number | null) {
    if (starValue === null) return;
    const index = this.filters.stars.indexOf(starValue);
    if (index === -1) {
      this.filters.stars.push(starValue);
    } else {
      this.filters.stars.splice(index, 1);
    }
    this.onFilter();
  }

  onFilter() { 
    this.filter.emit(this.filters);
  }
}
