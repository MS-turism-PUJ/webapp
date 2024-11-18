import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private graphqlUrl = 'http://localhost:8080/graphql'; 
    
    private axiosInstance: AxiosInstance;
    
    constructor(private authService:AuthService) { 
        this.axiosInstance = axios.create({
            baseURL: this.graphqlUrl,
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async getWeather(city: string): Promise<any> {
        const query =  `
      query {
        getWeather(city: "${city}") {
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
    ` ;

        try {
            const response = await this.axiosInstance.post('', { query });
            return response.data.data.getWeather;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
}
