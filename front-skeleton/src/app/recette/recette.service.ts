import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// --- Interfaces pour la réponse de l'API (DTO) ---
export interface IngredientDto {
  id: number;
  nom: string;
  quantite: string;
}

export interface UstensileDto {
  idUstensileDto: number;
  nomUstensileDto: string;
}

export interface RecetteDto {
  idRecetteDto: number;
  nomRecetteDto: string;
  ingredientsDto: IngredientDto[];
  ustensilesDto: UstensileDto[];
  dureeRecetteDto: number;
  difficulteRecetteDto: number;
  prixRecetteDto: number;
  imageRecetteDto: string;
  contenuRecetteDto: string;
}

// --- Interfaces pour le modèle utilisé par le frontend ---
export interface Ingredient {
  nom: string;
  quantite: string;
}

export interface Ustensile {
  nom: string;
}

export interface Recette {
  id: number;
  nom: string;
  imageUrl: string;
  duree: number;
  difficulte: number;
  prix: number;
  contenu: string;
  ingredients: Ingredient[];
  ustensiles: Ustensile[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8080/recettes';

  constructor(private http: HttpClient) { }

  // --- Méthodes publiques (pour les utilisateurs) ---

  getRecettesFavorites(): Observable<Recette[]> {
    return this.http.get<RecetteDto[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.toFrontendModel(dto)))
    );
  }

  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<RecetteDto>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.toFrontendModel(dto))
    );
  }

  addRecipe(recipeData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipeData);
  }

  // --- Méthodes d'administration ---

  getPendingRecettes(): Observable<Recette[]> {
    return this.http.get<RecetteDto[]>(`${this.apiUrl}/admin/pending`).pipe(
      map(dtos => dtos.map(dto => this.toFrontendModel(dto)))
    );
  }

  getAllRecettesAdmin(): Observable<Recette[]> {
    return this.http.get<RecetteDto[]>(`${this.apiUrl}/admin/all`).pipe(
      map(dtos => dtos.map(dto => this.toFrontendModel(dto)))
    );
  }

  getRejectedRecettes(): Observable<Recette[]> {
    return this.http.get<RecetteDto[]>(`${this.apiUrl}/admin/rejected`).pipe(
      map(dtos => dtos.map(dto => this.toFrontendModel(dto)))
    );
  }

  updateRecetteStatus(id: number, status: 'APPROVED' | 'REJECTED'): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/${id}/status`, status, { responseType: 'text' });
  }

  updateRecette(id: number, recette: Recette): Observable<any> {
    const dto = this.toDto(recette);
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  deleteRecette(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  // --- Méthodes de mapping ---

  private toFrontendModel(dto: RecetteDto): Recette {
    return {
      id: dto.idRecetteDto,
      nom: dto.nomRecetteDto,
      imageUrl: dto.imageRecetteDto,
      duree: dto.dureeRecetteDto,
      difficulte: dto.difficulteRecetteDto,
      prix: dto.prixRecetteDto,
      contenu: dto.contenuRecetteDto,
      ingredients: dto.ingredientsDto.map(ing => ({ nom: ing.nom, quantite: ing.quantite })),
      ustensiles: dto.ustensilesDto.map(ust => ({ nom: ust.nomUstensileDto }))
    };
  }

  private toDto(recette: Recette): RecetteDto {
    return {
      idRecetteDto: recette.id,
      nomRecetteDto: recette.nom,
      imageRecetteDto: recette.imageUrl,
      dureeRecetteDto: recette.duree,
      difficulteRecetteDto: recette.difficulte,
      prixRecetteDto: recette.prix,
      contenuRecetteDto: recette.contenu,
      ingredientsDto: recette.ingredients.map(ing => ({ id: 0, nom: ing.nom, quantite: ing.quantite })),
      ustensilesDto: recette.ustensiles.map(ust => ({ idUstensileDto: 0, nomUstensileDto: ust.nom }))
    };
  }
}
