import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class UserRegistrationUseCase {
    constructor(private auth: Auth) {}

    async performRegistration(email: string, password: string, displayName: string, photoURL?: string): Promise<{ success: boolean; message: string }> {
        try {
        // Registrar usuario con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        // Actualizar perfil del usuario con displayName y photoURL
        await updateProfile(user, { displayName, photoURL: photoURL || '' });

        // Devuelve un mensaje de éxito
        return { success: true, message: "Usuario registrado con éxito" };
        } catch (error: any) {
        // Manejo de errores basado en el código de Firebase
        let errorMessage = 'Ocurrió un error al registrar el usuario';
        switch (error.code) {
            case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.';
            break;
            case 'auth/invalid-email':
            errorMessage = 'La dirección de correo electrónico no es válida.';
            break;
            case 'auth/weak-password':
            errorMessage = 'La contraseña es muy débil.';
            break;
            default:
            errorMessage += ': ' + error.message;
            break;
        }
        return { success: false, message: errorMessage };
        }
    }
}
