import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientList } from '../models/ingredient';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = environment.apiUrl +'/ingredients';

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<IngredientList[]> {
    return this.http.get<IngredientList[]>(this.apiUrl);
  }

  createIngredient(payload: { nomIngredient: string; idCategorie?: number }): Observable<IngredientList> {
    return this.http.post<IngredientList>(this.apiUrl, payload);
  }
}
