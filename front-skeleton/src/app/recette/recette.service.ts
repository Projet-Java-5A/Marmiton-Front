import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface pour la réponse de l'API (DTO)
export interface RecetteDto {
  idRecetteDto: number;
  nomRecetteDto: string;
  ingredientsDto: any[];
  ustensilesDto: any[];
  dureeRecetteDto: number;
  difficulteRecetteDto: number;
  prixRecetteDto: number;
  imageRecetteDto: string;
  contenuRecetteDto: string;
}

// Interface pour le modèle utilisé par le frontend
export interface Recette {
  id: number;
  nom: string;
  imageUrl: string;
  duree: number;
  difficulte: number;
  prix: number;
  contenu: string;
  // Autres champs si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8080/recettes';

  constructor(private http: HttpClient) { }

  // Récupère les recettes depuis l'API et les mappe vers le modèle frontend
  getRecettesFavorites(): Observable<Recette[]> {
    return this.http.get<RecetteDto[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.toFrontendModel(dto)))
    );
  }

  // Récupère une recette par son ID (suppose l'existence de /recettes/{id})
  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<RecetteDto>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.toFrontendModel(dto))
    );
  }

  // Méthode pour ajouter une recette (conservée depuis la branche admin)
  addRecipe(recipeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipeData);
  }

  // Fonction privée pour convertir le DTO en modèle frontend
  private toFrontendModel(dto: RecetteDto): Recette {
    return {
      id: dto.idRecetteDto,
      nom: dto.nomRecetteDto,
      imageUrl: dto.imageRecetteDto,
      duree: dto.dureeRecetteDto,
      difficulte: dto.difficulteRecetteDto,
      prix: dto.prixRecetteDto,
      contenu: dto.contenuRecetteDto
    };
  }
}