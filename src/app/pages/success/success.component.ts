import { Component, inject } from '@angular/core';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  peopleInfo = inject(SharedDataService).peopleInfo;
  hotelInfo = inject(SharedDataService).hotelData;

}
