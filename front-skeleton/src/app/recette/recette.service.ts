import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recette {
  id: number;
  nom: string;
  imageUrl: string;
  note: number; 
  tempsPreparation: string;
  prixApproximatif: string;
  ingredients: string[];
  etapes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8080/recettes';
  
  private recettes: Recette[] = [
    {
      id: 3, 
      nom: 'Tarte au thon',
      imageUrl: '/assets/images/tarte-thon.jpg', 
      note: 2,
      tempsPreparation: 'Environ 20 min',
      prixApproximatif: '~5€ / personne',
      ingredients: [
        'Une boîte de thon',
        '3 tomates',
        '2 oeufs',
        '20cl de crème fraîche',
        '1 pâte brisée'
      ],
      etapes: [
        'Préchauffez le four à 180°C (Thermostat 6).',
        'Étalez la pâte brisée dans un moule à tarte.',
        'Mélangez les oeufs, la crème fraîche et le thon émietté.',
        'Versez la préparation sur la pâte.',
        'Coupez les tomates en rondelles et disposez-les sur la tarte.',
        'Enfournez pour 25 minutes.'
      ]
    },
  ];

  constructor(private http: HttpClient) { }

  // Method from homepage branch
  getRecettesFavorites(): Observable<Recette[]> {
    return of(this.recettes);
  }

  // Method from homepage branch
  getRecetteById(id: number): Observable<Recette | undefined> {
    return this.getRecettesFavorites().pipe(
      map(recettes => recettes.find(recette => recette.id === id))
    );
  }

  // Method from admin branch
  addRecipe(recipeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipeData);
  }
}
