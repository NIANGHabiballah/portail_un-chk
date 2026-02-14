import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-enseignant',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-enseignant.component.html',
  styleUrl: './dashboard-enseignant.component.css'
})
export class DashboardEnseignantComponent implements OnInit {
  stats = {
    totalEtudiants: 0,
    moyenneClasse: 0,
    tauxReussite: 0,
    devoirsEnAttente: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.http.get<any>('http://localhost:8080/api/enseignant/stats').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: () => {
        this.stats = {
          totalEtudiants: 176,
          moyenneClasse: 14.2,
          tauxReussite: 87,
          devoirsEnAttente: 12
        };
      }
    });
  }
}
