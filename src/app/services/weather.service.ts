import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    // URL del backend expuesto por WeatherController
    private apiUrl = 'http://localhost:8080/api/weather';

    constructor(private http: HttpClient) { }

    getWeather(city: string): Observable<any> {
        // Realizar la solicitud HTTP al backend con el parámetro city
        return this.http.get(`${this.apiUrl}?city=${city}`);
    }
}
