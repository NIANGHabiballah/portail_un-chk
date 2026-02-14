import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    document.body.classList.add('no-menu');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-menu');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      // Comptes de test mock
      const mockAccounts = [
        { email: 'etudiant@unchk.edu.sn', password: 'etudiant123', role: 'etudiant' },
        { email: 'enseignant@unchk.edu.sn', password: 'enseignant123', role: 'enseignant' },
        { email: 'admin@unchk.edu.sn', password: 'admin123', role: 'admin' }
      ];
      
      const mockAccount = mockAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (mockAccount) {
        console.log('Connexion réussie avec compte mock', mockAccount);
        localStorage.setItem('user', JSON.stringify(mockAccount));
        
        // Redirection selon le rôle
        if (mockAccount.role === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        } else if (mockAccount.role === 'enseignant') {
          this.router.navigate(['/dashboard-enseignant']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        return;
      }
      
      // Si pas de compte mock, essayer avec le backend
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Connexion réussie', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Email ou mot de passe incorrect.';
          console.error('Erreur de connexion', err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }
}