import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteLocation } from '../interfaces/favorite-location';

const BASE_URL = environment.endpoint

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getFavoriteLocations() {
    return this.http.get<FavoriteLocation[]>(BASE_URL + '/api/weather/favoriteLocations')
  }
}
