import { Component } from '@angular/core';

@Component({
  selector: 'app-communication',
  imports: [],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css'
})
export class CommunicationComponent {

    creerReunion() {
      alert("Fonctionnalité 'Créer une Réunion' en cours de développement.");
  }

  planifierSeminaire() {
      alert("Fonctionnalité 'Planifier un Séminaire' en cours de développement.");
  }

  ajouterCirculaire() {
      alert("Fonctionnalité 'Ajouter une Circulaire' en cours de développement.");
  }

}
