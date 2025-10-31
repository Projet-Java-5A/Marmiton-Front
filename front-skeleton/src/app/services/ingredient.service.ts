import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientList } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:8080/ingredients';

  constructor(private http: HttpClient) { }

  getAllIngredients(): Observable<IngredientList[]> {
    return this.http.get<IngredientList[]>(this.apiUrl);
  }
}
