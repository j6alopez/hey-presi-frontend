import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { authInterceptor } from './auth/interceptors/auth.interceptor';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/i18n/',
    '.json');
}

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: HttpLoaderFactory
      }
    })),
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
};
