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
  currentConditions: CurrentConditions = null


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getFavoriteLocations()
    this.getCurrentlyViewedLocation()
  }

  getFavoriteLocations(){
    this.weatherService.getFavoriteLocations().subscribe(fav => {
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

  getCurrentConditions(locationId){
    this.weatherService.getCurrentConditions(locationId).subscribe(conditions => {
      this.currentConditions = conditions.length > 0 ? { ...conditions[0] } : null
      console.log(this.currentConditions)
    })
  }


}
