import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar', // Assurez-vous que le sélecteur est correct
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // Exposition de l'utilisateur courant en tant qu'observable pour le template
  currentUser$: Observable<UserDto | null>;
  isHomePage: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    // On récupère le flux de données de l'utilisateur depuis le service
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.urlAfterRedirects === '/';
    });
  }

  // Méthode pour appeler la déconnexion
  logout(): void {
    this.authService.logout();
  }

  // Méthode pour gérer la recherche
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    console.log('Recherche lancée pour le terme :', searchTerm); // <-- AJOUT DU LOG ICI
    this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
  }
}