// login.component.ts (actualizado)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GoogleMapsComponent } from "../../components/google-maps/google-maps.component";
import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';



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
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToRegistry() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const emailOrUsername = formData.emailOrUsername;
      const password = formData.password
      try {
        
        await this.authService.login(emailOrUsername, password);
        console.log('Login exitoso!');
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Error en el login:', error);
        
      }
    } else {
      console.log('Formulario Inválido');
    
    }
  }
}
