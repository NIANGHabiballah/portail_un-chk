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
import { ChangerMotDePasseComponent } from './components/changer-mot-de-passe/changer-mot-de-passe.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { AideComponent } from './components/aide/aide.component';
import { DevoirsComponent } from './components/devoirs/devoirs.component';
import { NotesComponent } from './components/notes/notes.component';
import { CoursComponent } from './components/cours/cours.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEnseignantComponent } from './components/dashboard-enseignant/dashboard-enseignant.component';
import { EnseignantCoursComponent } from './components/enseignant-cours/enseignant-cours.component';
import { EnseignantNotesComponent } from './components/enseignant-notes/enseignant-notes.component';
import { EnseignantAnnoncesComponent } from './components/enseignant-annonces/enseignant-annonces.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-enseignant', component: DashboardEnseignantComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'appui-insertion', component: AppuiInsertionComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'changer-mot-de-passe', component: ChangerMotDePasseComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'aide', component: AideComponent },
  { path: 'devoirs', component: DevoirsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'enseignant/cours', component: EnseignantCoursComponent },
  { path: 'enseignant/notes', component: EnseignantNotesComponent },
  { path: 'enseignant/annonces', component: EnseignantAnnoncesComponent },
  { path: '**', redirectTo: 'login' }
];
