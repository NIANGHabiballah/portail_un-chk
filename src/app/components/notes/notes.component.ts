import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

declare var bootstrap: any;

@Component({
  selector: 'app-notes',
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes = [
    { matiere: 'Interaction Homme-Machine', enseignant: 'Dr. Mamadou FALL', note: 16, coefficient: 3, statut: 'Validé' },
    { matiere: 'Technologie d\'Application Web', enseignant: 'Pr. Fatou SARR', note: 15, coefficient: 4, statut: 'Validé' },
    { matiere: 'Base de Données Avancées', enseignant: 'Dr. Moussa DIOP', note: 14, coefficient: 3, statut: 'Validé' },
    { matiere: 'Génie Logiciel', enseignant: 'Pr. Aminata NDIAYE', note: 13.5, coefficient: 3, statut: 'Validé' },
    { matiere: 'Sécurité Informatique', enseignant: 'Dr. Ibrahima SECK', note: 14, coefficient: 2, statut: 'Validé' }
  ];

  downloadPDF(): void {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Relevé de Notes', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Semestre 2 - 2025/2026', 105, 30, { align: 'center' });
    doc.text('Moyenne Générale: 14.5/20', 105, 40, { align: 'center' });
    
    let y = 60;
    doc.setFontSize(10);
    doc.text('Matière', 20, y);
    doc.text('Note', 120, y);
    doc.text('Coef', 150, y);
    doc.text('Statut', 170, y);
    
    y += 10;
    this.notes.forEach(note => {
      doc.text(note.matiere, 20, y);
      doc.text(`${note.note}/20`, 120, y);
      doc.text(`${note.coefficient}`, 150, y);
      doc.text(note.statut, 170, y);
      y += 10;
    });
    
    doc.save('releve-notes.pdf');
    this.showToast('Relevé téléchargé avec succès');
  }

  showToast(message: string): void {
    const toastElement = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    if (toastElement && toastMessage) {
      toastMessage.textContent = message;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
