import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  location: { locationId: number, locationName: string, locationCountry: string } = { locationId: null, locationName: null, locationCountry: null}
  threeDayForecast: any[] = [
    {
      Date: '2021-03-14T07:00:00-06:00',
      EpochDate: 1615726800,
      Temperature: {
        Minimum: {
          Value: 39,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 55,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 14,
        IconPhrase: 'Partly sunny w/ showers',
        HasPrecipitation: true,
        PrecipitationType: 'Rain',
        PrecipitationIntensity: 'Light',
      },
      Night: {
        Icon: 36,
        IconPhrase: 'Intermittent clouds',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=1&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=1&lang=en-us',
    },
    {
      Date: '2021-03-15T07:00:00-06:00',
      EpochDate: 1615813200,
      Temperature: {
        Minimum: {
          Value: 39,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 60,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 7,
        IconPhrase: 'Cloudy',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 38,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=2&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=2&lang=en-us',
    },
    {
      Date: '2021-03-16T07:00:00-06:00',
      EpochDate: 1615899600,
      Temperature: {
        Minimum: {
          Value: 38,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 53,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 6,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 38,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=3&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/salt-lake-city-ut/84111/daily-weather-forecast/331216?day=3&lang=en-us',
    },
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    //this.getLastViewedLocation()
  }

  getLastViewedLocation() {
    this.weatherService.currentlyViewedLocation$.subscribe(location => {
      this.location = location
      this.getThreeDayForecast(location.locationId)
    })
  }

  getThreeDayForecast(locationId) {
    this.weatherService.getFiveDayForecast(locationId).subscribe(forecast => {
      console.log(forecast)
      this.threeDayForecast = forecast.DailyForecasts.slice(0, 3)
    })
  }
}
