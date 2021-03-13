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
  currentlyViewedLocation$: BehaviorSubject<number> = new BehaviorSubject(331216)

  constructor(private http: HttpClient) { }

  getFavoriteLocations() {
    return this.http.get<FavoriteLocation[]>(BASE_URL + '/api/weather/favoriteLocations')
  }

  addFavoriteLocation(newLocation: FavoriteLocation) {
    this.http.post<any>(BASE_URL + '/api/weather/addFavoriteLocation', newLocation).subscribe(response => {
      console.log('response from adding location', response)
    })
  }

  deleteFavoriteLocation(locationKey: number){
    const params = new HttpParams().set('locationKey', locationKey.toString())

    this.http.delete(BASE_URL + '/api/weather/deleteFavoriteLocation', { params })
  }

  getAutocompleteLocationInfo(searchTerm: string){
    const params = new HttpParams().set('location', searchTerm)

    return this.http.get<any[]>(BASE_URL + '/api/weather/autocompleteLocationInfo', { params})
  }

  getCurrentConditions(locationId: number) {
    const params = new HttpParams().set('locationID', locationId.toString())

    return this.http.get<CurrentConditions[]>(BASE_URL + '/api/weather/getCurrentConditions', { params })
  }
}
