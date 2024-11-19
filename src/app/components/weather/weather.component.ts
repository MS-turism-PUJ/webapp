import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() cityName: string = ''; // Recibir el nombre de la ciudad desde el componente padre
  weatherData: WeatherData = {
    city: 'Ciudad no especificada',
    country: 'N/A',
    temperature: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    pressure: 0,
    clouds: 0,
    wind_speed: 0,
    description: 'Descripción no disponible',
    icon: '01d' // Icono genérico por defecto
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    if (this.cityName) {
      this.fetchWeather(this.cityName);
    } else {
      console.warn('No city provided, using default.');
      this.fetchWeather('Quito'); // Ciudad por defecto
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Escuchar los cambios en `cityName` y actualizar el clima
    if (changes['cityName'] && !changes['cityName'].firstChange) {
      const newCity = changes['cityName'].currentValue;
      this.fetchWeather(newCity);
    }
  }

  async fetchWeather(city: string): Promise<void> {
    try {
      this.weatherService.getWeather(city).subscribe({
        next: (data) => {
          this.weatherData = data; // Asigna los datos cuando se reciben
          console.log('Weather data received:', this.weatherData);
        },
        error: (error) => {
          console.error('Error fetching weather data:', error);
        },
      });
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
