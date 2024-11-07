import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common'; 
import { ModalsComponent } from './modals/modals.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class AppComponent implements OnInit{
  showLayout: boolean = true;
  isLoggedIn: boolean = false;
  constructor(
    private auth: Auth, 
    private router: Router,
    private modalController: ModalController,
  ) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showLayout = !(currentRoute.includes('login') || currentRoute.includes('register') || currentRoute.includes('add-product'));
    });
  }

  ngOnInit() {
    // Observador del estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user; // true si el usuario está logueado, false si no
      this.showLayout = this.isLoggedIn;

      if (!user) {
        this.router.navigate(['/login']); // Redirigir al login si no hay usuario autenticado
      }
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalsComponent,
      cssClass: 'my-custom-class', // Clase personalizada opcional
      componentProps: {
        // Pasar datos al modal si es necesario
        prop1: 'value1',
        prop2: 'value2'
      }
    });
    return await modal.present();
  }

  async navigateTo(route: string) {
      await this.router.navigateByUrl(route); 
  }

  logout() {
    // Cerrar sesión de Firebase
    signOut(this.auth)
      .then(() => {
        console.log('User signed out successfully');
        this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }
}
