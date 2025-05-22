import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { InputComponent } from '../../components/input/input.component';
import { MatIcon } from '@angular/material/icon';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [InputComponent, MatIcon],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss',
})
export class HotelComponent {
  item: any;
  hotels: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, public sharedData: SharedDataService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.apiService.getHotels().subscribe((data: any) => {
      this.hotels = data;
      this.item = this.hotels.find((hotel: any) => hotel.id == id);
    });
  }

  createArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  goCheckout(hotel: any, room: any) {
    this.sharedData.hotelData = hotel
    this.sharedData.roomData = room
    this.router.navigate(['/checkout']);
  }
}
