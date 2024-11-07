import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  gridOutline, 
  addCircleOutline, 
  logOutOutline, 
  informationCircleOutline, 
  addOutline, 
  bookOutline, 
  cartOutline, 
  fastFoodOutline, 
  personSharp, 
  peopleOutline, 
  qrCode, 
  personCircleOutline, 
  trashOutline, 
  arrowBackOutline, 
  checkmarkCircle, 
  closeCircle,     
  arrowBack,         
  cameraOutline,    
  createOutline       
} from 'ionicons/icons';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Registrar todos los íconos necesarios
addIcons({
  'home-outline': homeOutline,
  'grid-outline': gridOutline,
  'add-circle-outline': addCircleOutline,
  'log-out-outline': logOutOutline,
  'information-circle-outline': informationCircleOutline,
  'add': addOutline,
  'book-outline': bookOutline,
  'cart-outline': cartOutline,
  'fast-food-outline': fastFoodOutline,
  'person-sharp': personSharp,
  'people-outline': peopleOutline,
  'qr-code': qrCode,
  'add-outline': addOutline,
  'person-circle-outline': personCircleOutline,
  'trash-outline': trashOutline,
  'arrow-back-outline': arrowBackOutline,
  'checkmark-circle': checkmarkCircle, 
  'close-circle': closeCircle,      
  'arrow-back': arrowBack,           
  'camera-outline': cameraOutline, 
  'create-outline': createOutline  
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideHttpClient(), // Proveer HttpClient para la aplicación
  ],
});
