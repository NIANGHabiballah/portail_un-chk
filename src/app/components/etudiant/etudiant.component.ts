import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../services/etudiant.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-etudiant',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [], // Supprimez provideHttpClient()
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit {
  etudiantForm: FormGroup;
  etudiants: any[] = []; // Liste des étudiants
  message: string = ''; // Message de succès ou d'erreur

  constructor(private etudiantService: EtudiantService, private fb: FormBuilder) {
    this.etudiantForm = this.fb.group({
      id: [''],
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      formation: [''],
      promo: [''],
      anneeDebut: [''],
      anneeSortie: [''],
      diplome: [''], // Ajout du champ manquant
      autresFormations: [''] // Ajout du champ manquant
    });
  }

  ngOnInit(): void {
    this.getEtudiants(); // Charger la liste des étudiants au démarrage
    this.loadEtudiants(); // Charger les étudiants au démarrage
  }

    // Charger les étudiants depuis l'API
    loadEtudiants(): void {
      this.etudiantService.getEtudiants().subscribe({
        next: (response) => {
          // Assurez-vous que `response.data` contient bien un tableau
          if (response && Array.isArray(response.data)) {
            this.etudiants = response.data;
          } else {
            console.error('La réponse de l\'API n\'est pas valide ou ne contient pas de tableau.');
            this.etudiants = [];
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des étudiants :', err);
          this.message = 'Impossible de charger les étudiants.';
        }
      });
    }

  // Récupérer tous les étudiants
  getEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
      this.etudiants = data.data; // Assurez-vous que votre API retourne un champ "data"
      },
      error: (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
      }
    });
  }

  // Créer ou mettre à jour un étudiant
  saveEtudiant(): void {
    const etudiant = this.etudiantForm.value;
    console.log('Données envoyées pour modification :', etudiant);
    if (etudiant.id) {
      this.etudiantService.updateEtudiant(etudiant.id, etudiant).subscribe({
        next: () => {
          console.log('Modification réussie');
          this.message = 'Étudiant mis à jour avec succès.';
          this.loadEtudiants(); // Recharger la liste
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          this.message = 'Erreur lors de la mise à jour.';
        }
      });
    } else {
      // Ajouter un nouvel étudiant
      this.etudiantService.createEtudiant(etudiant).subscribe({
        next: () => {
          this.message = 'Étudiant ajouté avec succès.';
          this.loadEtudiants(); // Recharger la liste
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
          this.message = 'Erreur lors de l\'ajout.';
        }
      });
    }
    this.etudiantForm.reset(); // Réinitialiser le formulaire
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): void {
    this.etudiantService.deleteEtudiant(id).subscribe({
      next: () => {
        this.message = 'Étudiant supprimé avec succès.';
        this.loadEtudiants(); // Recharger la liste
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        this.message = 'Erreur lors de la suppression.';
      }
    });
  }

  // Pré-remplir le formulaire pour modifier un étudiant
  editEtudiant(etudiant: any): void {
    // Convertir la date au format "yyyy-MM-dd" si elle existe
    if (etudiant.dateNaissance) {
      const date = etudiant.dateNaissance;
      if (/^\d{8}$/.test(date)) { // Vérifie si la date est au format "ddMMyyyy"
        const jour = date.substring(0, 2);
        const mois = date.substring(2, 4);
        const annee = date.substring(4, 8);
        etudiant.dateNaissance = `${annee}-${mois}-${jour}`; // Reformater en "yyyy-MM-dd"
      }
    }
  
    // Pré-remplir le formulaire
    this.etudiantForm.patchValue(etudiant);
  }
}
