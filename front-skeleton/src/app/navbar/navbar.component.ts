import { Component } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = []

  constructor() {
    this.links.push({ name: "Ajouter une recette", href: "add-recette" })
    this.links.push({ name: "Login", href: "login" })
  }
}
