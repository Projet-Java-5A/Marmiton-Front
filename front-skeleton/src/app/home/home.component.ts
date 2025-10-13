import { Component, OnInit } from '@angular/core';

// 1. Importez l'interface 'Recette' depuis votre composant carrousel.
//    (Assurez-vous que le chemin relatif est correct pour votre projet)
import { Recette } from '../carousel-recettes/carousel-recettes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recettesFavorites: Recette[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chargerRecettes();
  }


  chargerRecettes(): void {

    this.recettesFavorites = [
      {
        id: 1,
        nom: 'Tarte aux framboises',
        imageUrl: 'https://images.pexels.com/photos/1327821/pexels-photo-1327821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 2,
        nom: 'Gratin dauphinois',
        imageUrl: 'https://images.pexels.com/photos/15085149/pexels-photo-15085149/free-photo-of-gratin-de-pommes-de-terre-dans-un-plat-en-ceramique.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 3,
        nom: 'Tarte au thon',
        imageUrl: 'https://images.pexels.com/photos/8992926/pexels-photo-8992926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 4,
        nom: 'Gâteau au chocolat',
        imageUrl: 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 5,
        nom: 'Crème brûlée',
        // Pas d'imageUrl, affichera le placeholder
      },
      {
        id: 6,
        nom: 'Crème brûlée',
        // Pas d'imageUrl, affichera le placeholder
      }
    ];
  }
}