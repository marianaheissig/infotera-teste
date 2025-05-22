import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

 public inputData = {
    location: null,
    startDate: '',
    endDate: '',
    people: {
      adults: 0,
      children: 0,}
  };

  public hotelData : any;
  public roomData : any
  public peopleInfo: any;

  
  
  getData() {
    return this.inputData;
  }
}
