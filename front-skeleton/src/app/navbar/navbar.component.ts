import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service"; // 1. Importer AuthService
import { Observable } from "rxjs"; // 2. Importer Observable
import { UserDto } from "../models/user.dto"; // 3. Importer le modèle UserDto

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  // 4. Exposer l'observable de l'utilisateur au template
  currentUser$: Observable<UserDto | null>;

  constructor(private authService: AuthService) {
    // 5. Initialiser l'observable
    this.currentUser$ = this.authService.currentUser$;
  }

  // 6. Créer une méthode pour la déconnexion
  logout(): void {
    this.authService.logout();
  }
}