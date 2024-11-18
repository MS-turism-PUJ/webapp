// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  currentStep: number = 1;
  defaultAvatar: string = 'assets/avatar.svg';
  imageUrl: string = this.defaultAvatar;
  file?: File;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({

      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],


      edad: ['', [Validators.required, Validators.min(0)]],
      tipoUsuario: ['', Validators.required],
      descripcion: ['', Validators.maxLength(300)],

      //(solo para proveedores)
      telefono: [''],
      web_page: [''],
      redes_sociales: ['']
    });
  }

  ngOnInit(): void { }

  goToLogin() {
    this.router.navigate(['/']);
  }

  onFileSelected(event: any): void {
    this.file = event.target?.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  validatePositiveValue(event: any): void {
    const inputValue = event.target.value;
    if (inputValue < 1) {
      event.target.value = '';
    }
  }


  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
      setTimeout(() => {
        this.registerForm.get('tipoUsuario')?.setValue('')
      }, 100);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      if (this.currentStep === 1) {
        this.registerForm.get('tipoUsuario')?.setValue('');
      }
    }
  }

  async onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      if (this.isProveedor()) {
        this.authService.registerProvider(
          this.registerForm.get('username')?.value,
          this.registerForm.get('nombre')?.value,
          this.registerForm.get('edad')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value,
          this.registerForm.get('descripcion')?.value,
          this.registerForm.get('telefono')?.value,
          this.registerForm.get('web_page')?.value,
          this.file
        ).then(() => {
          this.router.navigate(['/dashboard'])
        })
        .catch((error) => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, por favor intenta de nuevo',
          })
        })

      } else {
        this.authService.registerClient(
          this.registerForm.get('username')?.value,
          this.registerForm.get('nombre')?.value,
          this.registerForm.get('edad')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value,
          this.registerForm.get('descripcion')?.value,
          this.file
        ).then(() => {
          this.router.navigate(['/dashboard'])
        })
          .catch((error) => {
            console.error(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error, por favor intenta de nuevo',
            })
          })
      }

    } else {
      console.error('Formulario inválido');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos obligatorios',
      });
    }
  }

  isProveedor(): boolean {
    return this.registerForm.get('tipoUsuario')?.value === 'proveedor';
  }

  onTipoUsuarioChange(): void {
    const tipoUsuario = this.registerForm.get('tipoUsuario')?.value;

    if (tipoUsuario === 'proveedor') {
      this.registerForm.get('telefono')?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.registerForm.get('telefono')?.clearValidators();
    }
    this.registerForm.get('telefono')?.updateValueAndValidity();
  }

}

