import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errorMessage: string = '';
  currentStep: number = 1;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      role: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    document.body.classList.add('no-menu');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-menu');
  }

  isStep1Valid(): boolean {
    return !!(this.registerForm.get('email')?.valid &&
           this.registerForm.get('password')?.valid &&
           this.registerForm.get('confirmPassword')?.valid &&
           this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value);
  }

  nextStep(): void {
    if (this.isStep1Valid()) {
      this.currentStep = 2;
    }
  }

  previousStep(): void {
    this.currentStep = 1;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }

      this.authService.register({ email, password }).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
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
