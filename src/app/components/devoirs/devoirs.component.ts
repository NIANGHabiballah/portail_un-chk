import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-devoirs',
  imports: [CommonModule],
  templateUrl: './devoirs.component.html',
  styleUrl: './devoirs.component.css'
})
export class DevoirsComponent {
  devoirs = [
    { id: 1, titre: 'Projet IHM - Prototype Figma', matiere: 'Interaction Homme-Machine', description: 'Créer un prototype interactif sur Figma pour une application mobile.', dateLimite: '20/02/2026', statut: 'À rendre' },
    { id: 2, titre: 'TP Base de Données', matiere: 'Base de Données Avancées', description: 'Optimisation de requêtes SQL et indexation.', dateLimite: '25/02/2026', statut: 'À rendre' },
    { id: 3, titre: 'Rapport Génie Logiciel', matiere: 'Génie Logiciel', description: 'Analyse des méthodologies agiles.', dateLimite: '10/02/2026', statut: 'Rendu', note: 16 }
  ];
  selectedDevoir: any = null;
  selectedFile: File | null = null;

  selectDevoir(devoir: any): void {
    this.selectedDevoir = devoir;
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitDevoir(): void {
    if (!this.selectedFile) {
      this.showToast('Veuillez sélectionner un fichier', true);
      return;
    }

    // Simulation de soumission (sans appel backend)
    this.showToast(`Devoir "${this.selectedDevoir.titre}" soumis avec succès`);
    this.selectedDevoir.statut = 'Rendu';
    this.selectedFile = null;
    
    // Réinitialiser le champ fichier
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  showToast(message: string, isError: boolean = false): void {
    const toastElement = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    if (toastElement && toastMessage) {
      toastMessage.textContent = message;
      toastElement.className = isError ? 'toast align-items-center text-white bg-danger border-0' : 'toast align-items-center text-white bg-success border-0';
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
