// Imports nettoyés et organisés
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { RecetteService } from '../recette/recette.service';
import { AuthService } from '../services/auth.service';
import { IngredientService } from '../services/ingredient.service';

export interface Ingredient {
  id_ingredient: number;
  nom_ingredient: string;
  id_categorie: number;
}

export interface Ustensile {
  idUstensileDto: number;
  nomUstensileDto: string;
}

@Component({
  selector: 'add-recette',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    TextFieldModule
  ],
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.scss']
})
export class AddRecetteComponent implements OnInit {
  recetteForm: FormGroup;
  ingredientsList: Ingredient[] = [];
  ustensilesList: Ustensile[] = [];
  priceRanges: string[] = ['1-10€', '10-20€', '20-30€', '30-40€', '40-50€', '50+€'];
  stars: number[] = [1, 2, 3, 4, 5];
  // UI for creating a new ingredient inline
  showAddIngredientField = false;
  newIngredientName = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private recetteService: RecetteService,
    private authService: AuthService,
    private router: Router,
    private ingredientService: IngredientService
  ) {
    this.recetteForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: [[], Validators.required],
      quantities: this.fb.array([]),
      ustensiles: [[]],
      image: [''],
      steps: ['', Validators.required],
      price: ['', Validators.required],
      difficulty: [3, Validators.required],
      dureeRecette: ['', Validators.required] // Champ mis à jour
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
    this.fetchUstensiles();

    this.recetteForm.get('ingredients')?.valueChanges.subscribe(selectedIngredients => {
      this.updateQuantitiesForm(selectedIngredients);
    });
  }

  fetchIngredients() {
    this.http.get<Ingredient[]>('http://localhost:8080/ingredients').subscribe({
      next: (data) => { 
        this.ingredientsList = data; 
      },
      error: (err) => console.error('Erreur ingrédients', err)
    });
  }

  openAddIngredient() {
    this.showAddIngredientField = true;
    this.newIngredientName = '';
  }

  createIngredient() {
    if (!this.newIngredientName) return;
    const payload: any = { nomIngredient: this.newIngredientName };
    this.ingredientService.createIngredient(payload).subscribe({
      next: (created) => {
        // add to list and select it
        this.ingredientsList.push({ id_ingredient: created.id_ingredient, nom_ingredient: created.nom_ingredient, id_categorie: created.id_categorie });
        // Try to select the created ingredient in the form
        const current = this.recetteForm.get('ingredients')?.value || [];
        this.recetteForm.get('ingredients')?.setValue([...current, { id_ingredient: created.id_ingredient, nom_ingredient: created.nom_ingredient, id_categorie: created.id_categorie }]);
        this.showAddIngredientField = false;
      },
      error: (err) => {
        console.error('Erreur création ingrédient', err);
        alert('Impossible de créer l\'ingrédient.');
      }
    });
  }

  fetchUstensiles() {
    this.http.get<Ustensile[]>('http://localhost:8080/ustensiles').subscribe({
      next: (data) => { this.ustensilesList = data; },
      error: (err) => console.error('Erreur ustensiles', err)
    });
  }

  get quantitiesFormArray() {
    return this.recetteForm.get('quantities') as FormArray;
  }

  updateQuantitiesForm(selectedIngredients: any[]) {
    this.quantitiesFormArray.clear();
    if (!selectedIngredients || !Array.isArray(selectedIngredients)) {
      return;
    }

    const selectedIngredientIds: number[] = selectedIngredients
      .map(i => {
        if (i == null) return null;
        // if the select returns an id (number)
        if (typeof i === 'number') return i;
        // if the item is an object with id_ingredient
        if (i.id_ingredient != null) return i.id_ingredient;
        // fallback for different shapes
        if (i.id != null) return i.id;
        return null;
      })
      .filter((v): v is number => v != null);

    selectedIngredientIds.forEach(id => {
      const ingredient = this.ingredientsList.find(i => i.id_ingredient === id);
      if (ingredient) {
        this.quantitiesFormArray.push(this.fb.group({
          ingredientId: [ingredient.id_ingredient],
          ingredientName: [ingredient.nom_ingredient],
          quantity: ['', Validators.required]
        }));
      }
    });
  }

  rate(rating: number) {
    this.recetteForm.get('difficulty')?.setValue(rating);
  }

  mapRangeToPrice(range: string): number {
    if (range === '50+€') return 50;
    return parseInt(range.split('-')[0], 10);
  }

  onSubmit() {
    if (!this.recetteForm.valid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      alert('Vous devez être connecté pour ajouter une recette.');
      this.router.navigate(['/login']);
      return;
    }

    const formValue = this.recetteForm.value;

    const payload = {
      nomRecette: formValue.name,
      ingredients: formValue.quantities.map((q: { ingredientId: number; quantity: string; }) => ({
        ingredientId: q.ingredientId,
        quantite: q.quantity
      })),
      ustensilesIds: formValue.ustensiles.map((u: any) => u.idUstensileDto),
      imageRecette: formValue.image,
      contenuRecette: formValue.steps,
      prixRecette: this.mapRangeToPrice(formValue.price),
      difficulteRecette: formValue.difficulty,
      dureeRecette: formValue.dureeRecette,
      utilisateurId: currentUser.idUserDto
    };

    this.recetteService.addRecipe(payload).subscribe({
      next: () => {
        alert('Recette ajoutée avec succès !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de la recette", err);
        alert("Une erreur est survenue lors de l'ajout de la recette.");
      }
    });
  }
}