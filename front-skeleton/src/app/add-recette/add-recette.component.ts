// Imports nettoyés et organisés
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Modules Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';

// --- Interfaces pour typer les données de l'API ---
export interface Ingredient {
  id: number;
  name: string;
}

export interface Ustensile {
  idUstensile: number;
  nomUstensile: string;
}

@Component({
  selector: 'add-recette',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    TextFieldModule
  ],
  templateUrl: './add-recette.component.html',
  styleUrl: './add-recette.component.scss'
})
export class AddRecetteComponent implements OnInit {
  recetteForm: FormGroup;
  ingredientsList: Ingredient[] = [];
  ustensilesList: Ustensile[] = []; // Nouvelle propriété pour les ustensiles
  priceRanges: string[] = ['1-10€', '10-20€', '20-30€', '30-40€', '40-50€', '+50€'];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recetteForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: [[], Validators.required],
      quantities: this.fb.array([]),
      ustensiles: [[]],
      image: [''],
      steps: ['', Validators.required],
      price: ['', Validators.required],
      difficulty: [3, Validators.required]
    });
  }

  ngOnInit(): void {
    // On appelle les deux méthodes au chargement du composant
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
        console.log('Ingrédients chargés :', this.ingredientsList);
      },
      error: (err) => console.error('Erreur lors de la récupération des ingrédients', err)
    });
  }

  // Nouvelle méthode pour récupérer les ustensiles
  fetchUstensiles() {
    this.http.get<Ustensile[]>('http://localhost:8080/ustensiles').subscribe({
      next: (data) => {
        this.ustensilesList = data;
        console.log('Ustensiles chargés :', this.ustensilesList);
      },
      error: (err) => console.error('Erreur lors de la récupération des ustensiles', err)
    });
  }

  get quantitiesFormArray() {
    return this.recetteForm.get('quantities') as FormArray;
  }

  updateQuantitiesForm(selectedIngredients: Ingredient[]) {
    this.quantitiesFormArray.clear();
    selectedIngredients.forEach(ingredient => {
      this.quantitiesFormArray.push(this.fb.group({
        ingredientName: [ingredient.name],
        quantity: ['', Validators.required]
      }));
    });
  }

  rate(rating: number) {
    this.recetteForm.get('difficulty')?.setValue(rating);
  }

  onSubmit() {
    if (this.recetteForm.valid) {
      console.log(this.recetteForm.value);
      // TODO: Logique d'envoi des données au backend
    }
  }
}