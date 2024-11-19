import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
    clouds: number;
    wind_speed: number;
    description: string;
    icon: string;
}

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private apollo: Apollo) { }

    getWeather(city: string): Observable<WeatherData> {
        const GET_WEATHER = gql`
      query getWeather($city: String!) {
        getWeather(city: $city) {
          city
          country
          temperature
          temp_max
          temp_min
          humidity
          pressure
          clouds
          wind_speed
          description
          icon
        }
      }
    `;

        return this.apollo
            .query<{ getWeather: WeatherData }>({
                query: GET_WEATHER,
                variables: { city },
            })
            .pipe(map((result) => result.data.getWeather));
    }
}
