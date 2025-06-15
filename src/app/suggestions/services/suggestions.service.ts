import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuggestionsResponse } from '../models/suggestions.response';
import { SuggestionsRequest } from '../models/suggestions.request';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private http: HttpClient) { }

  search(request: SuggestionsRequest) : Observable<SuggestionsResponse[]>{
    return this.http.post<SuggestionsResponse[]>('https://localhost:8082/travel/suggestions', request);
  }
} 