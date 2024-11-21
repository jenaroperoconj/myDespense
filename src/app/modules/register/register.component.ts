import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationUseCase } from '../../use-cases/user-registration.use-case';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userRegistrationUseCase: UserRegistrationUseCase,
    private router: Router,
    private alertController: AlertController
  ) {
    // Inicializar el formulario con validaciones
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  // Validar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onRegister() {
    const { email, password, displayName } = this.registerForm.value;
    const result = await this.userRegistrationUseCase.performRegistration(email, password, displayName);

    // Mostrar mensaje basado en el resultado del registro
    const alert = await this.alertController.create({
      header: result.success ? 'Registro Exitoso' : 'Error',
      message: result.message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (result.success) {
            this.router.navigate(['/login']); // Navegar al login en caso de éxito
          }
        }
      }]
    });

    await alert.present();
  }

  onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}
