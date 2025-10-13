import { Component, OnInit } from "@angular/core"

interface Recette {
  nom: string;
  imageUrl: string;
}
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent {
  // Tableau avec les recettes à afficher
  favoris: Recette[] = [
    {
      nom: 'Tarte aux framboises',
      imageUrl: 'https://images.pexels.com/photos/1327821/pexels-photo-1327821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      nom: 'Gratin dauphinois',
      imageUrl: 'https://images.pexels.com/photos/15085149/pexels-photo-15085149/free-photo-of-gratin-de-pommes-de-terre-dans-un-plat-en-ceramique.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      nom: 'Tarte au thon',
      imageUrl: 'https://images.pexels.com/photos/8992926/pexels-photo-8992926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      nom: 'Gâteau au chocolat',
      imageUrl: 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
}