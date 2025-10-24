import { Component, Input } from '@angular/core';
import { Recette } from '../recette/recette.service'; // Import de l'interface partagée

@Component({
  selector: 'app-carousel-recettes',
  templateUrl: './carousel-recettes.component.html',
  styleUrls: ['./carousel-recettes.component.scss'],
})
export class CarouselRecettesComponent {
  @Input() recettes: Recette[] = [];
  constructor() { }
}