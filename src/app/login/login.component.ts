import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null; // Variable para almacenar errores de autenticación.

  constructor(
    private fb: FormBuilder, // Validar formularios
    private auth: Auth,
    private router: Router,
    private userService: UserService, // Servicio para guardar el email del usuario
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Guardar el correo en el servicio de usuario después de un login exitoso
      this.userService.setEmail(email);

      this.router.navigate(['/home']).then(() => {
        console.log('Navigated to /home');
      }).catch((err) => {
        console.error('Navigation error:', err);
      });

    } catch (error) {
      console.error('Login failed:', error);
      this.loginError = 'Invalid email or password.';
    }
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register']).then(() => {
      console.log('Navigated to /register');
    }).catch((err) => {
      console.error('Navigation error:', err);
    });
  }

  ngOnInit() {}
}
