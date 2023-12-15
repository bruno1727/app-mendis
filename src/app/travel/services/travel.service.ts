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
    // return this.http.post<TravelResponse[]>('http://localhost:5295/travel', request);
    return this.http.get<TravelResponse[]>('https://mocki.io/v1/6f0f6597-0fa9-4ac9-9e54-cbcf4a4b659f');
  }
}
