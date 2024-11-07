import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,

  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    // validar formularios
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  // verificar que coincidan las contraseñas
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered:', userCredential.user);

      this.router.navigate(['/login']).then(() => {
        console.log('Navigated to /login');
      }).catch((err) => {
        console.error('Navigation error:', err);
      });

    } catch (error) {
      console.error('Registration failed:', error);
      this.registerError = 'Registration failed. Please try again.';
    }
  }

  onLoginButtonPressed() {
    this.router.navigate(['/login']).then(() => {
      console.log('Navigated to /login');
    }).catch((err) => {
      console.error('Navigation error:', err);
    });
}

  ngOnInit() {}
}

