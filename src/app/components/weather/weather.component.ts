import { Component,OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  weatherData: any = null;
  cityName: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Llamar con una ciudad por defecto al iniciar
    this.fetchWeather('Washington');
  }

  async fetchWeather(city: string): Promise<void> {
    try {
      this.weatherData = await this.weatherService.getWeather(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  onSearch(): void {
    if (this.cityName.trim()) {
      this.fetchWeather(this.cityName);
      this.cityName = ''; // Limpiar campo de búsqueda
    }
  }
}