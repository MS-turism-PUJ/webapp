import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  standalone: true,
  imports: [GoogleMap],
})
export class GoogleMapsComponent {
  content: Content = {
    contentId: '',
    name: '',
    description: '',
    user: {
      userId: 0,
      name: '',
      email: '',
      username: ''
    }
  };
  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 4.6556, lng: -74.06 };
  /* usar lat: 4.6556, lng: -74.06 y lat: 4.6556, lng: -74.1 para probar funcionamiento  */
  zoom = 14;

  mapOptions: google.maps.MapOptions = {
    mapId: 'b9aa52e7c202d563',
    zoom: this.zoom,
    center: this.center,
  };

  markers: google.maps.Marker[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  ngAfterViewInit() {
    this.directionsRenderer.setMap(this.map.googleMap!);
  }

  // TODO COLOCAR AQUÌ LAS COORDENADAS DEL SERVICIO
  addMarker(lat: number, lng: number): void {
    if (isNaN(lat) || isNaN(lng)) {
      alert('Por favor, ingresa coordenadas válidas.');
      return;
    }

    const position = { lat, lng };

    console.log(`Marcador añadido en: Latitud: ${lat}, Longitud: ${lng}`);

    const marker = new google.maps.Marker({
      position,
      map: this.map.googleMap!,
      animation: google.maps.Animation.DROP,
    });

    this.markers.push(marker);

    this.center = position;
    this.zoom = 16;

    if (this.markers.length === 2) {
      this.calculateAndDisplayRoute();
    }
  }

  calculateAndDisplayRoute(): void {
    if (this.markers.length < 2) {
      console.warn('Se requieren al menos dos marcadores.');
      return;
    }

    const origin = this.markers[0].getPosition();
    const destination = this.markers[1].getPosition();

    if (!origin || !destination) {
      console.error('No se pudieron obtener las posiciones de los marcadores.');
      return;
    }

    this.directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING, // se puede cambiar a WALKING, BICYCLING, TRANSIT
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          this.directionsRenderer.setDirections(response);

          const route = response.routes[0];
          if (route.legs && route.legs.length > 0) {
            const leg = route.legs[0];
            const distance = leg.distance ? leg.distance.text : 'Desconocida';
            const duration = leg.duration ? leg.duration.text : 'Desconocida';
            console.log(`Distancia: ${distance}, Duración: ${duration}`);
            alert(`Distancia: ${distance}, Duración: ${duration}`);
          }
        } else {
          console.error('Error en la ruta: ' + status);
        }
      }
    );
  }
}
