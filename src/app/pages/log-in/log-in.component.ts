// login.component.ts (actualizado)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../models/role';


@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
        const role = await this.authService.login(username, password);

        if (role === Role.CLIENT) {
          this.router.navigate(['/dashboard'])

        } else if (role === Role.PROVIDER) {
          this.router.navigate(['/provider'])

        } else {
          console.error('Error en el login:', 'No se reconoce el rol del usuario');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se reconoce el rol del usuario',
          });
        }

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
