import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';
import { CardComponent } from '../../components/card/card.component';
import { CreateContentProviderComponent } from '../../components/create-content-provider/create-content-provider.component';

@Component({
  selector: 'app-provider-screen',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CreateContentProviderComponent,
  ],
  templateUrl: './provider-screen.component.html',
  styleUrls: ['./provider-screen.component.css'],
})
export class ProviderScreenComponent implements OnInit {
  defaultAvatar: string = 'assets/avatar.svg';
  imageUrl: string = this.defaultAvatar;
  file?: File;
  isPopupVisible: boolean = false;

  contents: Content[] = []; // Arreglo para almacenar las tarjetas

  constructor(
    private router: Router,
    private authService: AuthService,
    private contentService: ContentService // Servicio para obtener los contenidos
  ) { }

  async ngOnInit(): Promise<void> {
    // Suscripción a los contenidos
    this.contentService.contentsSubject.subscribe((contents) => {
      this.contents = contents;
    });

    // Sincronizar contenidos
    await this.contentService.syncAllContents();
  }

  openPopup() {
    this.isPopupVisible = true;
    console.log('openPopup');
  }

  closePopup() {
    this.isPopupVisible = false;
  }

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
