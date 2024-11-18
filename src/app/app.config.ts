import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from './services/auth.service';
import { API_URL } from './config/environment/urls';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      GoogleMapsModule,
      FormsModule,
      HttpClientModule
    ), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);
      const authService = inject(AuthService);

      const auth = setContext((operation, context) => {
        const token = authService.getToken();

        if (token === null) {
          return {};
        } else {
          return {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
      });

      return {
        link: ApolloLink.from([auth, httpLink.create({ uri: `${API_URL}/marketplace/graphql` })]),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
