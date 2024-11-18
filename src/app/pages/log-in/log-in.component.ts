// login.component.ts (actualizado)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GoogleMapsComponent } from "../../components/google-maps/google-maps.component";
import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleMapsComponent, DragAndDropFilesComponent],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async goToDashboard() {
    try {
      await this.authService.login(this.loginForm.value.emailOrUsername, this.loginForm.value.password);

      this.router.navigate(['/dashboard']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
      });
      console.error('Error en el login:', error);
    }
  }

  goToRegistry() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void { }

  async onSubmit(event: Event) {
    event.preventDefault()

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const username = formData.username;
      const password = formData.password

      try {
        await this.authService.login(username, password);
        this.router.navigate(['/dashboard']);

      } catch (error) {
        console.error('Error en el login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      }
    } else {
      console.error('Formulario Inválido');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un usuario y contraseña válidos',
      });
    }
  }
}
