export interface CurrentConditions {
  localObservationDateTime: Date;
  epochTime: number;
  weatherText: string;
  weatherIcon: number;
  hasPrecipitation: boolean;
  precipitationType: string;
  isDayTime: boolean;
  temperature: {
    metric: {
      value: number;
      unit: string;
      unitType: number;
    },
    imperial: {
      value: number;
      unit: string;
      unitType: number;
    }
  }
  mobileLink: string;
  link: string
}
