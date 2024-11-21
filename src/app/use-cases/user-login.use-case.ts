import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class UserLoginUseCase {
    constructor(private auth: Auth, private alertController: AlertController) {}

    async performLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            console.log('Usuario autenticado:', userCredential.user);
            return { success: true, message: 'Inicio de sesión exitoso' };
        } catch (error: any) {
            let errorMessage = 'Ocurrió un error al iniciar sesión';
            switch (error.code) {
                case 'auth/user-not-found':
                errorMessage = 'Usuario no encontrado. Verifica tu correo electrónico.';
                break;
                case 'auth/wrong-password':
                errorMessage = 'Contraseña incorrecta. Intenta nuevamente.';
                break;
                case 'auth/invalid-email':
                errorMessage = 'Correo electrónico no válido.';
                break;
                default:
                errorMessage += ': ' + error.message;
                break;
            }
            return { success: false, message: errorMessage };
        }
    }

    private async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
        });
        await alert.present();
    }
}
