import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Message d'erreur pour l'utilisateur

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Connexion réussie', response);
          this.router.navigate(['/dashboard']); // Redirection vers le tableau de bord
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Erreur lors de la connexion.';
          console.error('Erreur de connexion', err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }

 
}