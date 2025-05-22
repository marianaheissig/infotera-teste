import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SharedDataService } from '../../service/shared-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatIcon, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  inputData = inject(SharedDataService).inputData;
  hotelData = inject(SharedDataService).hotelData;
  roomData = inject(SharedDataService).roomData;
  sharedData = inject(SharedDataService);
  
  totalPeople: number = this.inputData.people.adults + this.inputData.people.children;
  totalDays: number = Math.floor((new Date(this.inputData.endDate).getTime() -new Date(this.inputData.startDate).getTime()) /(1000 * 3600 * 24));
  totalPrice: number =this.roomData.price.amount * this.totalPeople * this.totalDays;
  tax: number = this.totalPrice * 0.08;
  totalPriceTax: number = this.totalPrice + this.tax;
  
  peopleNames: { firstName: string; lastName: string }[] = [];
  
  contact = ''
  emailContact = ''
  phoneContact = ''
  obsContact = ''
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.generateEmptyPeopleNames();
  }

  generateEmptyPeopleNames() {
    this.peopleNames = Array.from({ length: this.totalPeople }, () => ({
      firstName: '',
      lastName: '',
    }));
  }

  get totalArray(): number[] {
    return Array.from({ length: this.totalPeople }, (_, i) => i);
  }

  book() {
    const bookingData = { 
      contact: this.contact,
      emailContact: this.emailContact,
      phoneContact: this.phoneContact,
      obsContact: this.obsContact,
      peoples: this.peopleNames,
    }
    this.sharedData.peopleInfo = bookingData;
    this.router.navigate(['/success']);

  }

}
