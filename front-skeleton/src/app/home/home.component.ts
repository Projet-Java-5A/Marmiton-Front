import { Component, OnInit } from '@angular/core';
import { Recette, RecetteService } from '../recette/recette.service'; // Import depuis le service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recettesFavorites: Recette[] = [];

  constructor(private recetteService: RecetteService) { } // Injection du service

  ngOnInit(): void {
    this.chargerRecettes();
  }

  chargerRecettes(): void {
    // Appel au service pour récupérer les données de l'API
    this.recetteService.getRecettesFavorites().subscribe({
      next: (recettes) => {
        this.recettesFavorites = recettes;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recettes', err);
        // Ici, vous pourriez afficher un message d'erreur à l'utilisateur
      }
    });
  }
}