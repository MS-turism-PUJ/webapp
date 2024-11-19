import { Component, ViewChild, OnInit } from '@angular/core';
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
    },
    photo: ''
  };
  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 4.6556, lng: -74.06 };
  zoom = 14;

  mapOptions: google.maps.MapOptions = {
    mapId: 'b9aa52e7c202d563',
    zoom: this.zoom,
    center: this.center,
  };

  markers: google.maps.Marker[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    const contentId = this.route.snapshot.paramMap.get('contentId');
    if (contentId) {
      // Obtener contenido por ID
      this.content = await this.contentService.getContentById(contentId) || this.content;

      console.log('Contenido recibido:', this.content);

      // Añadir marcador inicial (coordenadas del servicio)
      if (this.content?.service?.latitude && this.content?.service?.longitude) {
        this.addMarker(
          this.content.service.latitude,
          this.content.service.longitude
        );
      } else {
        console.error('No se encontraron coordenadas iniciales para este contenido.');
      }

      // Añadir marcador de llegada (arrivalLatitude y arrivalLongitude)
      if (this.content?.service?.arrivalLatitude && this.content?.service?.arrivalLongitude) {
        this.addMarker(
          this.content.service.arrivalLatitude,
          this.content.service.arrivalLongitude
        );
      } else {
        console.warn('No se encontraron coordenadas de llegada para este contenido.');
      }
    }
  }

  ngAfterViewInit(): void {
    this.directionsRenderer.setMap(this.map.googleMap!);
  }

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

    // Intentar calcular la ruta si hay al menos dos marcadores
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
        travelMode: google.maps.TravelMode.DRIVING, // Se puede cambiar a WALKING, BICYCLING, TRANSIT
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
