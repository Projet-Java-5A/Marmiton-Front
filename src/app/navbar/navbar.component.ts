import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar', 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser$: Observable<UserDto | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    console.log('Recherche lancée pour le terme :', searchTerm); 
    this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
  }
}