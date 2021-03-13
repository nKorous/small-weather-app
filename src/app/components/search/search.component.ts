import { FavoriteLocation } from './../../interfaces/favorite-location';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  favoriteLocations: FavoriteLocation[] = []


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getFavoriteLocations()
  }

  getFavoriteLocations(){
    this.weatherService.getFavoriteLocations().subscribe(fav => {
      this.favoriteLocations = fav
    })
  }

}
