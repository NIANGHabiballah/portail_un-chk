import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = ''; // Message d'erreur pour l'utilisateur

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

        // Vérifiez si les mots de passe correspondent
       if (password !== confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }


      this.authService.register({ email, password }).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']); // Redirection vers la page de connexion
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
          console.error('Erreur d\'inscription', err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}
