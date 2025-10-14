import { Component, OnInit } from '@angular/core';
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
      },
      {
        id: 2,
        nom: 'Gratin dauphinois',
      },
      {
        id: 3,
        nom: 'Tarte au thon',
      },
      {
        id: 4,
        nom: 'Gâteau au chocolat',
      },
      {
        id: 5,
        nom: 'Crème brûlée',
      },
      {
        id: 6,
        nom: 'Crème brûlée',
      }
    ];
  }
}