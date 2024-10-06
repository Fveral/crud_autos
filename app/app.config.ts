import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())]
};
