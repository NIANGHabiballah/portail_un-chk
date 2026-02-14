import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

interface Annonce {
  id?: number;
  titre: string;
  contenu: string;
  type: string;
  date: Date;
}

@Component({
  selector: 'app-enseignant-annonces',
  imports: [CommonModule, FormsModule],
  templateUrl: './enseignant-annonces.component.html',
  styleUrl: './enseignant-annonces.component.css'
})
export class EnseignantAnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  showModal = false;
  currentAnnonce: Annonce = { titre: '', contenu: '', type: 'info', date: new Date() };

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces(): void {
    this.annonces = [
      { id: 1, titre: 'Examen IHM', contenu: 'L\'examen d\'Interaction Homme-Machine aura lieu le 20 février 2026 en salle A101. Durée : 3h. Documents autorisés.', type: 'warning', date: new Date('2026-02-10') },
      { id: 2, titre: 'Nouveau cours disponible', contenu: 'Le cours sur les heuristiques de Nielsen et l\'évaluation d\'interfaces est maintenant disponible sur la plateforme.', type: 'info', date: new Date('2026-02-15') },
      { id: 3, titre: 'Projet de groupe', contenu: 'Les groupes pour le projet de fin de semestre doivent être constitués avant le 25 février. Maximum 4 étudiants par groupe.', type: 'success', date: new Date('2026-02-12') },
      { id: 4, titre: 'Rappel : Rendu devoir', contenu: 'Le devoir sur les tests utilisateurs doit être rendu avant le 18 février à 23h59. Aucun retard ne sera toléré.', type: 'danger', date: new Date('2026-02-14') }
    ];
  }

  openModal(): void {
    this.currentAnnonce = { titre: '', contenu: '', type: 'info', date: new Date() };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  publierAnnonce(): void {
    this.currentAnnonce.id = this.annonces.length + 1;
    this.currentAnnonce.date = new Date();
    this.annonces.unshift({ ...this.currentAnnonce });
    this.closeModal();
    this.notificationService.showSuccess('Annonce publiée avec succès !');
  }

  deleteAnnonce(id: number): void {
    this.annonces = this.annonces.filter(a => a.id !== id);
    this.notificationService.showSuccess('Annonce supprimée avec succès !');
  }

  getTypeClass(type: string): string {
    const classes: any = {
      'info': 'border-primary',
      'warning': 'border-warning',
      'success': 'border-success',
      'danger': 'border-danger'
    };
    return classes[type] || 'border-primary';
  }
}
