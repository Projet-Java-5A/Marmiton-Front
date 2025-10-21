import { Component, Input } from '@angular/core';

export interface Recette {
  id: number | string;
  nom: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-carousel-recettes',
  templateUrl: './carousel-recettes.component.html',
  styleUrls: ['./carousel-recettes.component.scss'],
})
export class CarouselRecettesComponent {
  @Input() recettes: Recette[] = [];
  constructor() { }
}