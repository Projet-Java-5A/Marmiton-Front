import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  registerForm: FormGroup;
  loginForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;
    const payload = {
      prenomUser: formValue.firstName,
      nomUser: formValue.lastName,
      mailUser: formValue.email,
      mdpUser: formValue.password
    };

    this.userService.register(payload).subscribe({
      next: () => {
        alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        this.registerForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte', err);
        alert('Une erreur est survenue lors de la création du compte.');
      }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = {
      mailUser: this.loginForm.value.email,
      mdpUser: this.loginForm.value.password
    };
    this.authService.login(credentials).subscribe({
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert('Email ou mot de passe incorrect.');
      }
    });
  }
}