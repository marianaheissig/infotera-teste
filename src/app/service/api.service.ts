import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3333/'

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    return this.http.get(`${this.baseUrl}hotels`);
  }

  getHotelById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}hotel/${id}`);
  }

  getSuggestions(): Observable<any> { 
    return this.http.get(`${this.baseUrl}suggestions`);
  }

}
