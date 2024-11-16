import { Component, ViewChild, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, FormsModule, CommonModule], 
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('map', { static: false }) map!: google.maps.Map;

  center: google.maps.LatLngLiteral = { lat: 4.698, lng: -74.036 };
  zoom = 14;
  display?: google.maps.LatLngLiteral;

  markerLat: number | null = null;
  markerLng: number | null = null;
  markers: { position: google.maps.LatLngLiteral; options?: google.maps.MarkerOptions }[] = [];

  mapOptions: google.maps.MapOptions = {};

  ngOnInit() {
    console.log('Componente inicializado');
  }

  onMapMouseMove(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
      console.log('Mouse moved at:', this.display);
    }
  }

  addMarker() {
    if (this.markerLat != null && this.markerLng != null) {
      const newMarkerPosition = { lat: this.markerLat, lng: this.markerLng };
      this.markers.push({
        position: newMarkerPosition,
        options: { animation: google.maps.Animation.DROP },
      });
      console.log('Marcador agregado:', newMarkerPosition);
      console.log('Lista de marcadores:', this.markers);

      // Centrar el mapa en el nuevo marcador
      this.center = newMarkerPosition;
    } else {
      console.warn('Coordenadas no válidas. Latitud y Longitud son requeridas.');
    }
  }
}
