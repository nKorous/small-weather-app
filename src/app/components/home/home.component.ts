import { CurrentConditions } from './../../interfaces/current-conditions';
import { Component, OnInit } from '@angular/core';
import { FavoriteLocation } from 'src/app/interfaces/favorite-location';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  favoriteLocations: FavoriteLocation[] = []
  searchLocations: any[] = []
  currentlyViewedLocationID: number
  currentlyViewedLocationName: string
  currentConditions: CurrentConditions = null
  currentlyViewedOneDayForecast: any = null


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getFavoriteLocations()
    //this.getCurrentlyViewedLocation()
  }

  getFavoriteLocations(){
    this.weatherService.favoriteLocations$.subscribe(fav => {
      this.favoriteLocations = fav
    })
  }

  getCurrentlyViewedLocation(){
    this.weatherService.currentlyViewedLocation$.subscribe(id => {
      this.currentlyViewedLocationID = id

      this.getCurrentConditions(this.currentlyViewedLocationID)
    })
  }

  getSearchLocations(searchTerm: string) {
    this.weatherService.getAutocompleteLocationInfo(searchTerm).subscribe(response => {
      this.searchLocations = response
      console.log(this.searchLocations)
    })
  }

  getCurrentConditions(locationId: number){
    this.weatherService.getCurrentConditions(locationId).subscribe(conditions => {
      this.currentConditions = conditions.length > 0 ? { ...conditions[0] } : null
    })
  }

  getOneDayForecast(locationId: number) {
    this.weatherService.getOneDayForecast(locationId).subscribe(forecast => {
      this.currentlyViewedOneDayForecast = forecast.DailyForecasts[0]
      console.log(this.currentlyViewedOneDayForecast)
    })
  }

  addFavorite(location) {
    this.weatherService.addFavoriteLocation(location)
  }

  deleteFavorite(locationId: number){
    this.weatherService.deleteFavoriteLocation(locationId)
  }

  handleClickOnLocation(locationName: string, locationId: number) {
    this.currentlyViewedLocationID = locationId
    this.currentlyViewedLocationName = locationName

    this.getCurrentConditions(locationId)
    this.getOneDayForecast(locationId)
  }


}
