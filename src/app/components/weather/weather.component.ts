import { Component,OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
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

  fetchWeather(city: string): void {
    this.weatherService.getWeather(city).subscribe(
      data => {
        this.weatherData = data; 
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  onSearch(): void {
    if (this.cityName.trim()) {
      this.fetchWeather(this.cityName);
      this.cityName = ''; // Limpiar campo de búsqueda
    }
  }
}