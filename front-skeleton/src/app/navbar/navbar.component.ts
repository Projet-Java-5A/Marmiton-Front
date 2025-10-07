import { Component } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  mainLinks: Link[] = []
  userLink: Link | null = null;

  constructor() {
    this.mainLinks.push({ name: "Ajouter une recette", href: "add-recette" });
    this.userLink = { name: "Login", href: "login" };
  }
}
