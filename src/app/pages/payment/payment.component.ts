import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreditNamePipe } from './credit-name.pipe';
import { CreditNumberPipe } from './credit-number.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GoToDashboardComponent } from '../../components/go-to-dashboard/go-to-dashboard.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CreditNamePipe, CreditNumberPipe, GoToDashboardComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  debouncer: Subject<string> = new Subject();

  mesesYear = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  years = [22, 23, 24, 25, 26, 27, 28]

  cardNumber: string = ''
  cardName: string = ''
  month: number | string = 'MM'
  year: number[] | string = 'YY'
  cvv: string = ''


  constructor(private router: Router) {
    document.getElementById('selectMes')?.innerText != 'Month';
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);

  }

  // Agregando clase que rota la tarjeta
  rotate(tarjeta: HTMLElement) {
    tarjeta.classList.toggle('active')

  }

  // Mostrar formulario con boton giratorio
  displayForm() {
    document.getElementById('formulario-tarjeta')?.classList.toggle('active')
    document.getElementById('btn-abrir-formulario')?.classList.toggle('active')
  }

  complete(form: NgForm) {

    form.value.cardNumber = this.cardNumber
      // Eliminando espacios en blanco
      .replace(/\s/g, '')
      // Elimina las letras
      .replace(/\D/g, '')
      // Agregar espacio cada cuatro números
      .replace(/([0-9]{4})/g, '$1 ')
      // Eliminando últimos espaciados
      .trim()


    // document.getElementById('numero')?.textContent!=''

    // Desarrollando para cambiar imagen dinamicamente segun codigo verificador

    // Imagen Front

    switch (form.value.cardNumber.slice(0, 1)) {

      case "3":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen2 = document.createElement('img')
        imagen2.setAttribute('width', '150rem')
        imagen2.src = '/assets/americanexpress.png'
        document.getElementById('logo-marca')!.appendChild(imagen2)
        break;

      case "4":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen = document.createElement('img')
        imagen.setAttribute('width', '140rem')
        imagen.src = '/assets/visa.png'
        document.getElementById('logo-marca')!.appendChild(imagen)
        break;

      case "5":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen1 = document.createElement('img')
        imagen1.setAttribute('width', '130rem')
        imagen1.src = '/assets/mastercard.png'
        document.getElementById('logo-marca')!.appendChild(imagen1)
        break;

      case "6":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen3 = document.createElement('img')
        imagen3.setAttribute('width', '180rem')
        imagen3.src = '/assets/discover.png'
        document.getElementById('logo-marca')!.appendChild(imagen3)
        break;

      case "":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
    }

    // Imagen Back

    switch (form.value.cardNumber.slice(0, 1)) {

      case "3":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen2 = document.createElement('img')
        imagen2.setAttribute('width', '150rem')
        imagen2.src = '/assets/americanexpress.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen2)
        break;

      case "4":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen = document.createElement('img')
        imagen.setAttribute('width', '140rem')
        imagen.src = '/assets/visa.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen)
        break;

      case "5":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen1 = document.createElement('img')
        imagen1.setAttribute('width', '130rem')
        imagen1.src = '/assets/mastercard.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen1)
        break;

      case "6":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen3 = document.createElement('img')
        imagen3.setAttribute('width', '180rem')
        imagen3.src = '/assets/discover.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen3)
        break;

      case "":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
    }

    this.voltearTarjeta()
  }

  // crear una funcion en vez del 2do switch y la variable de entrada sea logo marca trasera y logo marca y luego llamar ambas funciones

  voltearTarjeta() {
    if (document.getElementById('tarjeta')?.classList.contains('active')) {
      document.getElementById('tarjeta')?.classList.remove('active')
    }
  }

  rellenarCVV() {
    if (!document.getElementById('tarjeta')?.classList.contains('active')) {
      document.getElementById('tarjeta')?.classList.add('active')
    }
  }

  /* 
    teclaPresionada(){
      this.debouncer
        .next( this.cardNumber)
        .subscribe( valor => {
        
      })
      
    } */



}
