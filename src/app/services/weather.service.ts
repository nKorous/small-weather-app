import { CurrentConditions } from './../interfaces/current-conditions';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteLocation } from '../interfaces/favorite-location';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = environment.endpoint

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentlyViewedLocation$: BehaviorSubject<number> = new BehaviorSubject(331216) //this is SLC as the default
  favoriteLocations$: BehaviorSubject<FavoriteLocation[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  loadFavoriteLocations() {
    this.http.get<FavoriteLocation[]>(BASE_URL + '/api/weather/favoriteLocations').subscribe(favorites => this.favoriteLocations$.next(favorites))
  }

  addFavoriteLocation(newLocation: FavoriteLocation) {
    this.http.post<any>(BASE_URL + '/api/weather/addFavoriteLocation', newLocation).subscribe(response => {
      this.loadFavoriteLocations()
    })
  }

  deleteFavoriteLocation(locationKey: number){
    const params = new HttpParams().set('locationKey', locationKey.toString())

    this.http.delete(BASE_URL + '/api/weather/deleteFavoriteLocation', { params }).subscribe(response => {
      this.loadFavoriteLocations()
    })
  }

  getAutocompleteLocationInfo(searchTerm: string){
    const params = new HttpParams().set('location', searchTerm)

    return this.http.get<any[]>(BASE_URL + '/api/weather/autocompleteLocationInfo', { params})
  }

  getCurrentConditions(locationId: number) {
    const params = new HttpParams().set('locationID', locationId.toString())

    return this.http.get<CurrentConditions[]>(BASE_URL + '/api/weather/getCurrentConditions', { params })
  }

  getOneDayForecast(locationId: number) {
    const params = new HttpParams().set('locationId', locationId.toString())

    return this.http.get<any>(BASE_URL + '/api/weather/getOneDayForecast', { params })
  }

  getFiveDayForecast(locationId: number) {
    const params = new HttpParams().set('locationId', locationId.toString())

    return this.http.get<any>(BASE_URL + '/api/weather/getFiveDayForecast', { params })
  }
}
