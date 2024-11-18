import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    // URL del backend expuesto por WeatherController
    private apiUrl = 'http://localhost:8080/api/weather';

    constructor(private apollo: Apollo) { }

    async getWeather(city: string): Promise<any> {
        return this.apollo.query({
            query: gql`
                query getWeather(city: $city) {
                    city
                    temperature
                    weather
                }
            `,
            variables: {
                city: city
            }
        }).toPromise();
    }
}