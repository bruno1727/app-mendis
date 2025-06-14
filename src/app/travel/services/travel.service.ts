import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelResponse } from '../models/travel.response';
import { TravelRequest } from '../models/travel.request';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private http: HttpClient) { }

  search(request: TravelRequest) : Observable<TravelResponse[]>{
    return this.http.post<TravelResponse[]>('https://localhost:8082/travel', request);
  }
}
