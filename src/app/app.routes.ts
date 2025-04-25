// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AppuiInsertionComponent } from './components/appui-insertion/appui-insertion.component';
import { FormationsComponent } from './components/formations/formations.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut vers la page de connexion
  { path: 'login', component: LoginComponent }, // Route pour la page de connexion
  { path: 'register', component: RegisterComponent }, // Route pour la page d'inscription
  { path: 'dashboard', component: DashboardComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'appui-insertion', component: AppuiInsertionComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: '**', redirectTo: 'login' } // Redirection pour les routes inconnues
];
