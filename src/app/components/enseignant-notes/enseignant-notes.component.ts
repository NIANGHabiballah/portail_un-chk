import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  matricule: string;
  note?: number;
  appreciation?: string;
}

@Component({
  selector: 'app-enseignant-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './enseignant-notes.component.html',
  styleUrl: './enseignant-notes.component.css'
})
export class EnseignantNotesComponent implements OnInit {
  coursSelectionne = 'IHM-M2';
  etudiants: Etudiant[] = [];
  moyenneClasse = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiants = [
      { id: 1, nom: 'NIANG', prenom: 'Tafsir', matricule: 'M2-001', note: 16, appreciation: 'Très bien' },
      { id: 2, nom: 'DIOP', prenom: 'Fatou', matricule: 'M2-002', note: 14.5, appreciation: 'Bien' },
      { id: 3, nom: 'FALL', prenom: 'Moussa', matricule: 'M2-003', note: undefined },
      { id: 4, nom: 'SY', prenom: 'Aminata', matricule: 'M2-004', note: 15, appreciation: 'Bien' },
      { id: 5, nom: 'BA', prenom: 'Mamadou', matricule: 'M2-005', note: 12, appreciation: 'Assez bien' },
      { id: 6, nom: 'SALL', prenom: 'Aissatou', matricule: 'M2-006', note: 17.5, appreciation: 'Excellent' }
    ];
    this.calculerMoyenne();
  }

  calculerMoyenne(): void {
    const notesValides = this.etudiants.filter(e => e.note !== undefined).map(e => e.note!);
    this.moyenneClasse = notesValides.length > 0 
      ? Math.round((notesValides.reduce((a, b) => a + b, 0) / notesValides.length) * 10) / 10
      : 0;
  }

  updateAppreciation(etudiant: Etudiant): void {
    if (etudiant.note !== undefined) {
      if (etudiant.note >= 16) etudiant.appreciation = 'Excellent';
      else if (etudiant.note >= 14) etudiant.appreciation = 'Très bien';
      else if (etudiant.note >= 12) etudiant.appreciation = 'Bien';
      else if (etudiant.note >= 10) etudiant.appreciation = 'Assez bien';
      else etudiant.appreciation = 'Insuffisant';
    }
    this.calculerMoyenne();
  }

  saveNotes(): void {
    this.notificationService.showSuccess('Notes enregistrées avec succès !');
  }

  exportCSV(): void {
    const csv = 'Matricule,Nom,Prénom,Note\n' + 
      this.etudiants.map(e => `${e.matricule},${e.nom},${e.prenom},${e.note || ''}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes_${this.coursSelectionne}.csv`;
    a.click();
    this.notificationService.showSuccess('Export CSV réussi !');
  }
}
