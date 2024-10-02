// login.component.ts (actualizado)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const emailOrPhone = formData.emailOrPhone;
      const password = formData.password
      try {
        
        await this.authService.login(emailOrPhone, password);
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
