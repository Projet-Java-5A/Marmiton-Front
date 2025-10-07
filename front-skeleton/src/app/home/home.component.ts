import { Component, OnInit } from "@angular/core"

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  recette = { id: 1, nom: "Nom de la recette" }; // Example property, replace with your logic

  constructor() {}

  ngOnInit(): void {}
}
