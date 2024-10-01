// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imageUrl: string = 'assets/miAmor.jpg';
  userTypes = [
    { value: 'cliente', viewValue: 'Cliente' },
    { value: 'proveedor', viewValue: 'Proveedor' }
  ];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      // Paso 1
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      
      // Paso 2
      edad: ['', [Validators.required,, Validators.min(0)]],
      telefono: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      
      // Paso 3 (solo para proveedores)
      descripcion: ['', Validators.maxLength(300)],
      web_page: [''],
      redes_sociales: ['']
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; 
      };
      reader.readAsDataURL(file);
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
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al backend
    }
  }

  isProveedor(): boolean {
    return this.registerForm.get('tipoUsuario')?.value === 'proveedor';
  }
}
