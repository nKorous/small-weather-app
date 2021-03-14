import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  location: { locationId: number, locationName: string, locationCountry: string } = { locationId: null, locationName: null, locationCountry: null}
  threeDayForecast: any[] = []

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getLastViewedLocation()
  }

  getLastViewedLocation() {
    this.weatherService.currentlyViewedLocation$.subscribe(location => {
      this.location = location
      this.getThreeDayForecast(location.locationId)
    })
  }

  getThreeDayForecast(locationId) {
    this.weatherService.getFiveDayForecast(locationId).subscribe(forecast => {
      this.threeDayForecast = forecast.DailyForecasts.slice(0, 3)
    })
  }
}
