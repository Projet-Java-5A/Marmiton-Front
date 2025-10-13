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
      imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsucre-saintlouis.com%2Frecette%2Frecette-tarte-aux-framboises%2F&psig=AOvVaw1ZVWbayMaX5Urzwj3LG-1Q&ust=1760435499239000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCJwLfzoJADFQAAAAAdAAAAABAE'
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