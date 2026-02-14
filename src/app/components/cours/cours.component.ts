import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-cours',
  imports: [CommonModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {
  cours = [
    { id: 1, titre: 'Interaction Homme-Machine', enseignant: 'Dr. Mamadou FALL', description: 'Conception d\'interfaces utilisateur et principes d\'ergonomie.', statut: 'En cours', fichier: 'cours-ihm.pdf' },
    { id: 2, titre: 'Technologie d\'Application Web', enseignant: 'Pr. Fatou SARR', description: 'Développement d\'applications web modernes avec Angular et Spring Boot.', statut: 'En cours', fichier: 'cours-taw.pdf' },
    { id: 3, titre: 'Base de Données Avancées', enseignant: 'Dr. Moussa DIOP', description: 'Optimisation et administration de bases de données relationnelles.', statut: 'En cours', fichier: 'cours-bda.pdf' },
    { id: 4, titre: 'Génie Logiciel', enseignant: 'Pr. Aminata NDIAYE', description: 'Méthodologies agiles et gestion de projets informatiques.', statut: 'En cours', fichier: 'cours-gl.pdf' },
    { id: 5, titre: 'Sécurité Informatique', enseignant: 'Dr. Ibrahima SECK', description: 'Cryptographie, sécurité réseau et protection des données.', statut: 'En cours', fichier: 'cours-secu.pdf' }
  ];

  consulterCours(cours: any): void {
    // Simuler le téléchargement du cours
    const link = document.createElement('a');
    link.href = `assets/cours/${cours.fichier}`;
    link.download = cours.fichier;
    link.click();
    this.showToast(`Téléchargement de "${cours.titre}" en cours...`);
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
