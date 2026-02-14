import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

interface Cours {
  id?: number;
  titre: string;
  code: string;
  niveau: string;
  nbEtudiants: number;
  description: string;
}

@Component({
  selector: 'app-enseignant-cours',
  imports: [CommonModule, FormsModule],
  templateUrl: './enseignant-cours.component.html',
  styleUrl: './enseignant-cours.component.css'
})
export class EnseignantCoursComponent implements OnInit {
  cours: Cours[] = [];
  showModal = false;
  editMode = false;
  currentCours: Cours = { titre: '', code: '', niveau: '', nbEtudiants: 0, description: '' };

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours(): void {
    this.cours = [
      { id: 1, titre: 'Interaction Homme-Machine', code: 'IHM-M2', niveau: 'Master 2', nbEtudiants: 45, description: 'Conception d\'interfaces utilisateur ergonomiques et accessibles' },
      { id: 2, titre: 'Base de Données Avancées', code: 'BDA-M2', niveau: 'Master 2', nbEtudiants: 38, description: 'Optimisation, administration et sécurité des bases de données' },
      { id: 3, titre: 'Développement Web', code: 'DEV-L3', niveau: 'Licence 3', nbEtudiants: 52, description: 'Technologies web modernes : HTML5, CSS3, JavaScript, Angular' },
      { id: 4, titre: 'Génie Logiciel', code: 'GL-M1', niveau: 'Master 1', nbEtudiants: 41, description: 'Méthodologies agiles, tests, qualité logicielle' }
    ];
  }

  openModal(cours?: Cours): void {
    this.editMode = !!cours;
    this.currentCours = cours ? { ...cours } : { titre: '', code: '', niveau: '', nbEtudiants: 0, description: '' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveCours(): void {
    if (this.editMode) {
      const index = this.cours.findIndex(c => c.id === this.currentCours.id);
      if (index !== -1) this.cours[index] = { ...this.currentCours };
      this.notificationService.showSuccess('Cours modifié avec succès !');
    } else {
      this.currentCours.id = this.cours.length + 1;
      this.cours.push({ ...this.currentCours });
      this.notificationService.showSuccess('Cours ajouté avec succès !');
    }
    this.closeModal();
  }

  deleteCours(id: number): void {
    this.cours = this.cours.filter(c => c.id !== id);
    this.notificationService.showSuccess('Cours supprimé avec succès !');
  }
}
