import { Component, ViewChild, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
export class GoogleMapsComponent implements OnInit {
  content: Content = {
    contentId: '',
    name: '',
    description: '',
    user: {
      userId: 0,
      name: '',
      email: '',
      username: '',
    },
    photo: '',
  };

  @Input() isEditable: boolean = true; // Determina si se pueden añadir o mover pines
  @Input() selectedService: string = '';

  @Output() coordinatesSelected = new EventEmitter<{ lat: number; lng: number }[]>();

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
  infoWindow = new google.maps.InfoWindow();

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const contentId = this.route.snapshot.paramMap.get('contentId');
    if (contentId) {
      this.content = (await this.contentService.getContentById(contentId)) || this.content;

      console.log('Contenido recibido:', this.content);

      if (this.content?.service?.latitude && this.content?.service?.longitude) {
        this.addMarker(this.content.service.latitude, this.content.service.longitude);
      }
    }
  }

  ngAfterViewInit(): void {
    this.directionsRenderer.setMap(this.map.googleMap!);

    if (this.isEditable) {
      this.map.googleMap!.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          this.handleMapClick(event.latLng.lat(), event.latLng.lng());
        }
      });
    }
  }

  handleMapClick(lat: number, lng: number): void {
    if (!this.isEditable) return;

    if (this.selectedService === 'HOUSING') {
      this.clearAllMarkers(); // Permitir solo un marcador para HOUSING
      this.addMarker(lat, lng);
    } else {
      if (this.markers.length >= 2) {
        this.removeOldestMarker();
      }
      this.addMarker(lat, lng);
    }

    // Emitir las coordenadas actuales
    const coordinates = this.markers.map((marker) => marker.getPosition()!.toJSON());
    this.coordinatesSelected.emit(coordinates);
  }

  clearAllMarkers(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }
  

  addMarker(lat: number, lng: number): void {
    const position = { lat, lng };

    console.log(`Marcador añadido en: Latitud: ${lat}, Longitud: ${lng}`);

    const marker = new google.maps.Marker({
      position,
      map: this.map.googleMap!,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => this.removeMarker(marker));

    this.markers.push(marker);

    if (this.markers.length === 2) {
      this.calculateAndDisplayRoute();
    }
  }

  removeMarker(marker: google.maps.Marker): void {
    const index = this.markers.indexOf(marker);
    if (index !== -1) {
      console.log(`Eliminando marcador en la posición: ${index}`);
      marker.setMap(null);
      this.markers.splice(index, 1);
    }

    if (this.markers.length < 2) {
      this.directionsRenderer.setDirections(null);
      this.infoWindow.close();
    }
  }

  removeOldestMarker(): void {
    if (this.markers.length > 0) {
      const oldestMarker = this.markers.shift();
      if (oldestMarker) {
        console.log('Eliminando marcador más antiguo');
        oldestMarker.setMap(null);
      }
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
        travelMode: google.maps.TravelMode.DRIVING,
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

            this.infoWindow.setContent(
              `<div>
                <strong>Medio de transporte:</strong> DRIVING<br>
                <strong>Distancia:</strong> ${distance}<br>
                <strong>Duración:</strong> ${duration}
              </div>`
            );
            this.infoWindow.setPosition(destination);
            this.infoWindow.open(this.map.googleMap!);
          }
        } else {
          console.error('Error en la ruta: ' + status);
        }
      }
    );
  }
}
