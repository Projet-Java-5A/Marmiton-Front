import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserDto } from '../models/user.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; 

  // BehaviorSubject pour stocker l'utilisateur courant et notifier les changements
  private currentUserSubject = new BehaviorSubject<UserDto | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { mailUser: string, mdpUser: string }): Observable<UserDto> {
    // L'endpoint '/login' doit retourner les informations de l'utilisateur en cas de succès
    return this.http.post<UserDto>(`${this.apiUrl}/users/login`, credentials).pipe(
      tap(user => {
        // Sauvegarder l'utilisateur dans le localStorage pour la persistance
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        // Rediriger vers la page d'accueil après la connexion
        this.router.navigate(['/']); 
      })
    );
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Récupère l'utilisateur depuis le localStorage au démarrage de l'app
   */
  private getUserFromStorage(): UserDto | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Permet de récupérer la valeur actuelle de l'utilisateur
   */
  public get currentUserValue(): UserDto | null {
    return this.currentUserSubject.value;
  }
  
  /**
   * Vérifie si l'utilisateur est un administrateur
   */
  public isAdmin(): boolean {
    const user = this.currentUserValue;
    return user ? user.isAdminDto : false;
  }
}