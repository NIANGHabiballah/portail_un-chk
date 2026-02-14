import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  stats = {
    etudiants: 1245,
    enseignants: 87,
    coursActifs: 156,
    demandesEnAttente: 23
  };

  demandesRecentes = [
    { id: 1, type: 'Attestation', etudiant: 'Tafsir NIANG', date: new Date('2026-02-15'), statut: 'En attente' },
    { id: 2, type: 'Relevé de notes', etudiant: 'Fatou DIOP', date: new Date('2026-02-14'), statut: 'En attente' },
    { id: 3, type: 'Certificat scolarité', etudiant: 'Moussa FALL', date: new Date('2026-02-13'), statut: 'Traitée' }
  ];

  activitesRecentes = [
    { action: 'Nouvel étudiant inscrit', user: 'Aminata SY', date: new Date(), icon: 'bi-person-plus', color: 'success' },
    { action: 'Demande traitée', user: 'Admin', date: new Date(), icon: 'bi-check-circle', color: 'primary' },
    { action: 'Cours créé', user: 'Prof. SALL', date: new Date(), icon: 'bi-book', color: 'info' }
  ];

  ngOnInit(): void {}
}
