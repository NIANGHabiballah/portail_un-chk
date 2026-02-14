import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationService, Message, Annonce } from '../../services/communication.service';

@Component({
  selector: 'app-communication',
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css'
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  annonces: Annonce[] = [];
  nouveauMessage: string = '';
  afficherNouvelleDiscussion: boolean = false;
  nouveauDestinataire: string = '';
  conversationMessages: any[] = [];
  rechercheTexte: string = '';
  messagesFiltres: Message[] = [];
  conversationActive: string = 'Dr. Mamadou FALL';
  afficherNouvelleAnnonce: boolean = false;
  nouvelleAnnonce = { titre: '', contenu: '', type: 'Nouveau' };

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.chargerMessages();
    this.chargerAnnonces();
    this.chargerConversationMessages();
  }

  chargerMessages() {
    this.communicationService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.messagesFiltres = data;
      },
      error: (err) => console.error('Erreur chargement messages', err)
    });
  }

  chargerConversationMessages() {
    this.communicationService.getMessages().subscribe({
      next: (data) => {
        this.conversationMessages = data
          .filter(m => m.destinataire === this.conversationActive || m.expediteur === this.conversationActive)
          .map(m => ({
            expediteur: m.expediteur,
            contenu: m.contenu,
            dateEnvoi: m.dateEnvoi,
            type: m.expediteur === 'Aminata' ? 'envoye' : 'recu'
          }));
      },
      error: (err) => console.error('Erreur chargement conversation', err)
    });
  }

  chargerAnnonces() {
    this.communicationService.getAnnonces().subscribe({
      next: (data) => this.annonces = data,
      error: (err) => console.error('Erreur chargement annonces', err)
    });
  }

  envoyerMessage() {
    if (this.nouveauMessage.trim()) {
      const message: Message = {
        expediteur: 'Aminata',
        destinataire: this.conversationActive,
        contenu: this.nouveauMessage,
        dateEnvoi: new Date(),
        lu: false
      };
      
      this.communicationService.envoyerMessage(message).subscribe({
        next: (data) => {
          this.conversationMessages.push({
            expediteur: 'Aminata',
            contenu: data.contenu,
            dateEnvoi: data.dateEnvoi,
            type: 'envoye'
          });
          this.nouveauMessage = '';
          this.chargerMessages();
        },
        error: (err) => console.error('Erreur envoi message', err)
      });
    }
  }

  nouveauMessageModal() {
    this.afficherNouvelleDiscussion = true;
    this.nouveauDestinataire = '';
    this.nouveauMessage = '';
  }

  annulerNouvelleDiscussion() {
    this.afficherNouvelleDiscussion = false;
  }

  demarrerDiscussion() {
    if (this.nouveauDestinataire.trim() && this.nouveauMessage.trim()) {
      const message: Message = {
        expediteur: 'Aminata',
        destinataire: this.nouveauDestinataire,
        contenu: this.nouveauMessage,
        dateEnvoi: new Date(),
        lu: false
      };
      
      this.communicationService.envoyerMessage(message).subscribe({
        next: (data) => {
          this.messages.unshift(data);
          this.messagesFiltres.unshift(data);
          this.conversationActive = this.nouveauDestinataire;
          this.conversationMessages = [{
            expediteur: 'Aminata',
            contenu: this.nouveauMessage,
            dateEnvoi: new Date(),
            type: 'envoye'
          }];
          this.afficherNouvelleDiscussion = false;
          this.nouveauDestinataire = '';
          this.nouveauMessage = '';
        },
        error: (err) => console.error('Erreur envoi message', err)
      });
    }
  }

  ouvrirConversation(destinataire: string) {
    this.conversationActive = destinataire;
    this.chargerConversationMessages();
  }

  rechercherMessages() {
    if (this.rechercheTexte.trim()) {
      this.messagesFiltres = this.messages.filter(m => 
        m.expediteur.toLowerCase().includes(this.rechercheTexte.toLowerCase()) ||
        m.contenu.toLowerCase().includes(this.rechercheTexte.toLowerCase())
      );
    } else {
      this.messagesFiltres = this.messages;
    }
  }

  ouvrirModalAnnonce() {
    this.afficherNouvelleAnnonce = true;
    this.nouvelleAnnonce = { titre: '', contenu: '', type: 'Nouveau' };
  }

  annulerNouvelleAnnonce() {
    this.afficherNouvelleAnnonce = false;
  }

  creerAnnonce() {
    if (this.nouvelleAnnonce.titre.trim() && this.nouvelleAnnonce.contenu.trim()) {
      const annonce: Annonce = {
        titre: this.nouvelleAnnonce.titre,
        contenu: this.nouvelleAnnonce.contenu,
        type: this.nouvelleAnnonce.type,
        datePublication: new Date()
      };
      
      this.communicationService.creerAnnonce(annonce).subscribe({
        next: () => {
          this.chargerAnnonces();
          this.afficherNouvelleAnnonce = false;
        },
        error: (err) => console.error('Erreur création annonce', err)
      });
    }
  }

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
