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


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({

      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],


      edad: ['', [Validators.required, , Validators.min(0)]],
      tipoUsuario: ['', Validators.required],
      descripcion: ['', Validators.maxLength(300)],

      //(solo para proveedores)
      telefono: ['', Validators.required],
      web_page: [''],
      redes_sociales: ['']
    });
  }

  ngOnInit(): void { }

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
      if (this.currentStep === 1) {
        this.registerForm.get('tipoUsuario')?.setValue('');
      }
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

