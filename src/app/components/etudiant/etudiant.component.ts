import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../services/etudiant.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-etudiant',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit {
  etudiantForm: FormGroup;
  etudiants: any[] = [];
  message: string = '';
  formStep: number = 1;
  isEditMode: boolean = false;
  selectedEtudiant: any = null;
  isLoading: boolean = false;
  isSaving: boolean = false;

  constructor(private etudiantService: EtudiantService, private fb: FormBuilder) {
    this.etudiantForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: [''],
      formation: ['', Validators.required],
      promo: ['', Validators.required],
      anneeDebut: [''],
      anneeSortie: [''],
      diplome: [''],
      autresFormations: ['']
    });
  }

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.isLoading = true;
    this.etudiantService.getEtudiants().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.etudiants = response.data;
        } else {
          console.error('La réponse de l\'API n\'est pas valide.');
          this.etudiants = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des étudiants :', err);
        this.message = 'Impossible de charger les étudiants.';
        this.isLoading = false;
      }
    });
  }

  isStep1Valid(): boolean {
    return !!(this.etudiantForm.get('nom')?.valid &&
           this.etudiantForm.get('prenom')?.valid &&
           this.etudiantForm.get('formation')?.valid &&
           this.etudiantForm.get('promo')?.valid);
  }

  nextFormStep(): void {
    if (this.isStep1Valid()) {
      this.formStep = 2;
    }
  }

  previousFormStep(): void {
    this.formStep = 1;
  }

  resetForm(): void {
    console.log('resetForm appelé');
    this.etudiantForm.reset();
    this.formStep = 1;
    this.isEditMode = false;
  }

  saveEtudiant(): void {
    if (this.isSaving) return;
    this.isSaving = true;
    const etudiant = this.etudiantForm.value;
    if (etudiant.id) {
      this.etudiantService.updateEtudiant(etudiant.id, etudiant).subscribe({
        next: () => {
          this.showToast('Étudiant modifié avec succès');
          this.loadEtudiants();
          this.resetForm();
          this.isSaving = false;
          const modalElement = document.getElementById('etudiantModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          this.showToast('Erreur lors de la modification', true);
          this.isSaving = false;
        }
      });
    } else {
      this.etudiantService.createEtudiant(etudiant).subscribe({
        next: () => {
          this.showToast('Étudiant ajouté avec succès');
          this.loadEtudiants();
          this.resetForm();
          this.isSaving = false;
          const modalElement = document.getElementById('etudiantModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showToast('Erreur lors de l\'ajout', true);
          this.isSaving = false;
        }
      });
    }
  }

  viewDetails(etudiant: any): void {
    this.selectedEtudiant = etudiant;
  }

  editEtudiant(etudiant: any): void {
    this.isEditMode = true;
    if (etudiant.dateNaissance) {
      const date = etudiant.dateNaissance;
      if (/^\d{8}$/.test(date)) {
        const jour = date.substring(0, 2);
        const mois = date.substring(2, 4);
        const annee = date.substring(4, 8);
        etudiant.dateNaissance = `${annee}-${mois}-${jour}`;
      }
    }
    this.etudiantForm.patchValue(etudiant);
  }

  selectForDelete(etudiant: any): void {
    this.selectedEtudiant = etudiant;
  }

  confirmDelete(): void {
    if (this.selectedEtudiant && this.selectedEtudiant.id) {
      this.etudiantService.deleteEtudiant(this.selectedEtudiant.id).subscribe({
        next: () => {
          this.showToast('Étudiant supprimé avec succès');
          this.loadEtudiants();
          this.selectedEtudiant = null;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  showToast(message: string, isError: boolean = false): void {
    const toastElement = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    if (toastElement && toastMessage) {
      toastMessage.textContent = message;
      toastElement.className = isError 
        ? 'toast align-items-center text-white bg-danger border-0'
        : 'toast align-items-center text-white bg-success border-0';
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  exportToCSV(): void {
    if (this.etudiants.length === 0) {
      this.showToast('Aucun étudiant à exporter', true);
      return;
    }

    const headers = ['ID', 'Nom', 'Prénom', 'Formation', 'Promo', 'Année Début', 'Année Sortie', 'Date Naissance', 'Diplôme'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    this.etudiants.forEach(etudiant => {
      const row = [
        etudiant.id || '',
        `"${etudiant.nom || ''}"`,
        `"${etudiant.prenom || ''}"`,
        `"${etudiant.formation || ''}"`,
        etudiant.promo || '',
        etudiant.anneeDebut || '',
        etudiant.anneeSortie || '',
        etudiant.dateNaissance || '',
        `"${etudiant.diplome || ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const date = new Date();
    const fileName = `etudiants_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.showToast(`${this.etudiants.length} étudiant${this.etudiants.length > 1 ? 's' : ''} exporté${this.etudiants.length > 1 ? 's' : ''} avec succès`);
  }
}
