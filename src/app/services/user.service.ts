import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Remplacez par l'URL de votre API backend
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  /**
   * Crée un nouvel utilisateur
   */
  register(userData: any): Observable<any> {
    // On envoie directement les données préparées par le composant.
    // On spécifie { responseType: 'text' } car le backend renvoie une réponse vide (non-JSON).
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }
}