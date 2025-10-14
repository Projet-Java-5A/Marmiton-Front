import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Remplacez par l'URL de votre API backend
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Crée un nouvel utilisateur
   */
  register(userData: any): Observable<UserDto> {
    const userToCreate: Partial<UserDto> = {
      nomUserDto: userData.lastName,
      prenomUserDto: userData.firstName,
      mailUserDto: userData.email,
      mdpUserDto: userData.password,
      isAdminDto: false,
      recettesDto: []
    };
    return this.http.post<UserDto>(this.apiUrl, userToCreate);
  }
}