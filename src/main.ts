import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InMemoryCache } from '@apollo/client/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  