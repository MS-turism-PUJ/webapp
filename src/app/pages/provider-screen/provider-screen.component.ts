import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';
import { CardComponent } from '../../components/card/card.component';
import { CreateContentProviderComponent } from '../../components/create-content-provider/create-content-provider.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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

  contents: Content[] = []; 
  user:User = {
    userId: 0,
    name: '',
    email: '',
    username: '',
    phone: 0,
    age: 0,
    webpage: '',
    description: '',
    socialmedia: ''
  } 

  photo: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private contentService: ContentService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    // Suscripción a los contenidos
    this.contentService.contentsSubject.subscribe((contents) => {
      this.contents = contents;
    });

    // Sincronizar contenidos


    this.userService.getMyInfo().then((user) => {
      this.user = user;
    } );

    this.userService.getMyphoto().then((photo) => {
      this.photo = photo;
    } );

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
