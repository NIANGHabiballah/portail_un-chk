import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8080/api/etudiants'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les étudiants
  getEtudiants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Récupérer un étudiant par ID
  getEtudiantById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel étudiant
  createEtudiant(etudiant: any): Observable<any> {
    return this.http.post(this.apiUrl, etudiant);
  }

  // Mettre à jour un étudiant existant
  updateEtudiant(id: number, etudiant: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, etudiant, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}