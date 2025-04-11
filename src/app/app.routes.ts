// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AppuiInsertionComponent } from './components/appui-insertion/appui-insertion.component';
import { FormationsComponent } from './components/formations/formations.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'appui-insertion', component: AppuiInsertionComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'etudiant', component: EtudiantComponent },
];
