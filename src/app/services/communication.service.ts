import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id?: number;
  expediteur: string;
  destinataire: string;
  contenu: string;
  dateEnvoi: Date;
  lu: boolean;
}

export interface Annonce {
  id?: number;
  titre: string;
  contenu: string;
  type: string;
  datePublication: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }

  envoyerMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }

  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces`);
  }

  creerAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(`${this.apiUrl}/annonces`, annonce);
  }
}
