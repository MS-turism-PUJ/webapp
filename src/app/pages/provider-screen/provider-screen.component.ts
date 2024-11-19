import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { GoToDashboardComponent } from '../../components/go-to-dashboard/go-to-dashboard.component';

@Component({
  selector: 'app-provider-screen',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,CardComponent, GoToDashboardComponent],
  templateUrl: './provider-screen.component.html',
  styleUrl: './provider-screen.component.css'
})
export class ProviderScreenComponent implements OnInit {
  defaultAvatar: string = 'assets/avatar.svg';
  imageUrl: string = this.defaultAvatar;
  file?: File;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
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

  

}

