import { Component } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent {
  mainLinks: Link[] = []
  userLink: Link | null = null;

  constructor() {
  }
}
