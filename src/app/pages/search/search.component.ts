import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../service/shared-data.service';
import { FilterComponent } from "../../components/filter/filter.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputComponent, MatIcon, FilterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private sharedService = inject(SharedDataService);

  hotels: any[] = []
  hotelsFiltered: any[] = []
  info: any

  location!: any;
  startDate: Date = new Date();
  endDate: Date = new Date();
  people: any
  starOptions: {
    value: number | null,
    label: string
    count: number
  } [] = []

  isFilterOn: boolean = false;

  ngOnInit() {
    this.apiService.getHotels().subscribe((data) => {
      this.hotels = data;
      this.hotelsFiltered = data;
      this.initializeStars();
    });

    this.info = this.sharedService.getData()
    this.location = this.info.location;
    this.startDate = this.info.startDate;
    this.endDate = this.info.endDate;
    this.people = this.info.people;
    
   }

  createArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }   

  getHotel(id: any) {
    this.router.navigate(['/hotel', id]);
  }

  onFilter(filters: any) { 
    this.hotelsFiltered = this.hotels.filter((hotel) => {
      const nameMatch = hotel.hotel.name.toLowerCase().includes(filters.name.toLowerCase());
      const priceMatch = hotel.lowestPrice.amount >= filters.minPrice && hotel.lowestPrice.amount <= filters.maxPrice;
      const starMatch = filters.stars.length === 0 || filters.stars.includes(hotel.hotel.stars);
      return nameMatch && priceMatch && starMatch;
    });
  }

  initializeStars() { 
    const starCounts: { [key: number]: number } = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    this.hotels.forEach((hotel) => {
      const stars = hotel.hotel.stars || 0;
        starCounts[stars]++;
    });
    this.starOptions = [
      { value: 0, label: 'Nao classificado', count: starCounts[0] },
      { value: 1, label: '1 Estrela', count: starCounts[1] },
      { value: 2, label: '2 Estrelas', count: starCounts[2] },
      { value: 3, label: '3 Estrelas', count: starCounts[3] },
      { value: 4, label: '4 Estrelas', count: starCounts[4] },
      { value: 5, label: '5 Estrelas', count: starCounts[5] }
    ]
  }

  toggleFilter() {
    this.isFilterOn = !this.isFilterOn;
  }
}
