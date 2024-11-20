import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { DragAndDropFilesComponent } from '../drag-and-drop-files/drag-and-drop-files.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-create-content-provider',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, GoogleMapsComponent, DragAndDropFilesComponent],
  templateUrl: './create-content-provider.component.html',
  styleUrls: ['./create-content-provider.component.css']
})
export class CreateContentProviderComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  contentForm: FormGroup;
  selectedService: string = ''; // Controla el tipo de servicio seleccionado
  hasService: boolean = false; // Controla si el contenido tiene un servicio
  areCoordinatesManagedByMap: boolean = true;

  constructor(private fb: FormBuilder, private contentService: ContentService) {
    this.contentForm = this.fb.group({
      // Campos generales del contenido
      name: ['', Validators.required],
      description: [''], // Opcional
      link: ['', [Validators.pattern('https?://.+')]], // Opcional
      photo: ['', Validators.required],
      photoExtension: ['', Validators.required],
      hasService: ['', Validators.required], // Obligatorio
      serviceType: ['', Validators.required], // Obligatorio cuando hasService es true

      // Campos comunes a todos los servicios
      nameService: ['', Validators.required],
      descriptionService: ['', Validators.required],
      price: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],

      // Campos específicos según el tipo de servicio
      latitude: [{ value: '', disabled: this.areCoordinatesManagedByMap }], // Inicialmente deshabilitado
      longitude: [{ value: '', disabled: this.areCoordinatesManagedByMap }], 
      arrivalLatitude: [{ value: '', disabled: this.areCoordinatesManagedByMap }], 
      arrivalLongitude: [{ value: '', disabled: this.areCoordinatesManagedByMap }],
      departureDate: [''], // Opcional
      duration: [''], // Opcional
      transportType: [''], // Opcional
      drink: [''], // Opcional
      lunch: [''], // Opcional
      dessert: [''] // Opcional
    });
  }

  // Manejo de "¿Tiene servicio?"
  onHasServiceChange(): void {
    this.hasService = this.contentForm.get('hasService')?.value === 'true';
    if (!this.hasService) {
      this.selectedService = '';
      this.resetServiceFields();
    }
  }

  // Manejo del cambio de tipo de servicio
  onServiceTypeChange(): void {
    this.selectedService = this.contentForm.get('serviceType')?.value;
    this.resetServiceFields();

    if (this.selectedService) {
      this.enableCommonServiceFields();

      // Validaciones específicas para cada tipo de servicio
      if (this.selectedService === 'ALIMENTATION') {
        this.setValidators(['drink', 'lunch', 'dessert']);
      } else if (this.selectedService === 'HOUSING') {
        this.setValidators(['latitude', 'longitude', 'departureDate', 'duration']);
      } else if (this.selectedService === 'TRANSPORT') {
        this.setValidators(['latitude', 'longitude', 'arrivalLatitude', 'arrivalLongitude', 'departureDate', 'duration', 'transportType']);
      } else if (this.selectedService === 'ECO_WALK') {
        this.setValidators(['latitude', 'longitude', 'arrivalLatitude', 'arrivalLongitude', 'departureDate', 'duration']);
      }

      this.updateServiceFieldsValidity();
    }
  }

  // Método para manejar las coordenadas desde Google Maps
  onCoordinatesSelected(coordinates: { lat: number; lng: number }[]): void {
    if (coordinates.length > 0) {
      // Asignar coordenadas al primer punto
      this.contentForm.patchValue({
        latitude: coordinates[0].lat,
        longitude: coordinates[0].lng
      });
    }
    if (coordinates.length > 1) {
      // Asignar coordenadas al segundo punto
      this.contentForm.patchValue({
        arrivalLatitude: coordinates[1].lat,
        arrivalLongitude: coordinates[1].lng
      });
    }
  }

  // Habilita los campos comunes cuando se selecciona un servicio
  private enableCommonServiceFields(): void {
    this.setValidators(['nameService', 'descriptionService', 'price', 'city', 'country']);
  }

  // Resetea los campos comunes y elimina sus validadores
  private resetServiceFields(): void {
    const fieldsToReset = ['nameService', 'descriptionService', 'price', 'city', 'country', 'latitude', 'longitude', 'arrivalLatitude', 'arrivalLongitude', 'departureDate', 'duration', 'transportType', 'drink', 'lunch', 'dessert'];
    fieldsToReset.forEach(field => {
      this.contentForm.get(field)?.clearValidators();
      this.contentForm.get(field)?.reset();
      this.contentForm.get(field)?.updateValueAndValidity();
    });
  }

  // Asigna validadores requeridos a los campos especificados
  private setValidators(fields: string[]): void {
    fields.forEach(field => {
      this.contentForm.get(field)?.setValidators([Validators.required]);
    });
  }

  // Actualiza la validez de los campos
  private updateServiceFieldsValidity(): void {
    Object.keys(this.contentForm.controls).forEach(field => {
      this.contentForm.get(field)?.updateValueAndValidity();
    });
  }

  // Nuevo: Verifica si el formulario es válido dinámicamente
  isFormValid(): boolean {
    return this.contentForm.valid;
  }

  onSubmit(): void {
    // if (!this.isFormValid()) {
    //   console.error('Formulario inválido:', this.contentForm.value);
    //   return;
    // }

    const contentData = this.buildContentData();

    this.contentService.createContentWithService(contentData)
      .then((content) => {
        console.log('Contenido creado exitosamente:', content);
        this.closePopup();
      })
      .catch((error) => {
        console.error('Error al crear el contenido:', error);
      });

    console.log('Formulario enviado:', this.contentForm.value);
    this.closePopup();
  }

  private buildContentData(): any {
    const formValues = this.contentForm.value;
    if (this.selectedService == "TRANSPORT" || this.selectedService == "ECO_WALK" || this.selectedService == "ALIMENTATION") {
      const content = {
        name: formValues.name,
        description: formValues.description || '',
        photo: formValues.photo,
        service: this.hasService
          ? {
            name: formValues.nameService,
            description: formValues.descriptionService,
            price: formValues.price,
            city: formValues.city,
            country: formValues.country,
            departure: {
              latitude: formValues.latitude || null,
              longitude: formValues.longitude || null,
            },
            arrival: {
              latitude: formValues.arrivalLatitude || null,
              longitude: formValues.arrivalLongitude || null
            },
            departureDate: formValues.departureDate || null,
            duration: formValues.duration || null,
            transportType: formValues.transportType || null,
            drink: formValues.drink || null,
            lunch: formValues.lunch || null,
            dessert: formValues.dessert || null,
            category: formValues.serviceType
          }
          : null
      };
      console.log('contenido antes de enviar', content);
      return content;
    }
    else {
      const content = {
        name: formValues.name,
        description: formValues.description || '',
        photo: formValues.photo,
        service: this.hasService
          ? {
            name: formValues.nameService,
            description: formValues.descriptionService,
            price: formValues.price,
            city: formValues.city,
            country: formValues.country,
            place: {
              latitude: formValues.latitude || null,
              longitude: formValues.longitude || null,
            },
            date: formValues.departureDate || null,
            duration: formValues.duration || null,
            transportType: formValues.transportType || null,
            drink: formValues.drink || null,
            lunch: formValues.lunch || null,
            dessert: formValues.dessert || null,
            category: formValues.serviceType
          }
          : null
      };
      console.log('contenido antes de enviar (housing)', content);
      return content;
    }

  }



  closePopup(): void {
    this.close.emit();
  }

  triggerDatePicker(id: string): void {
    const dateInput = document.getElementById(id) as HTMLInputElement;
    if (dateInput) {
      dateInput.showPicker(); // Abre manualmente el menú del calendario
    }
  }

  // Nuevo: Controlar intento de clic en botón deshabilitado
  onDisabledButtonClick(): void {
    console.log('Intento de clic en el botón, pero está deshabilitado.');
  }
}
