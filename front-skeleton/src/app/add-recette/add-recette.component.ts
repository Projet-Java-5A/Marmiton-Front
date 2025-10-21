import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { RecetteService } from '../services/recette.service';
import { AuthService } from '../services/auth.service';

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
  selector: 'app-add-recette',
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
  styleUrls: ['./add-recette.component.scss']
})
export class AddRecetteComponent implements OnInit {
  recetteForm: FormGroup;
  ingredientsList: Ingredient[] = [];
  ustensilesList: Ustensile[] = [];
  priceRanges: string[] = ['1-10€', '10-20€', '20-30€', '30-40€', '40-50€', '+50€'];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private recetteService: RecetteService,
    private authService: AuthService,
    private router: Router
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
      dureeRecette: [0] // Champ ajouté
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
      next: (data) => { this.ingredientsList = data; },
      error: (err) => console.error('Erreur ingrédients', err)
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
    const selectedIngredientIds = selectedIngredients.map(i => i.id_ingredient);

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
      ingredients: formValue.quantities.map((q: any) => ({
        ingredientId: q.ingredientId,
        quantite: q.quantity
      })),
      ustensilesIds: formValue.ustensiles.map((u: any) => u.idUstensileDto),
      imageRecette: formValue.image,
      contenuRecette: formValue.steps,
      prixRecette: parseInt(formValue.price.split('-')[0], 10),
      difficulteRecette: formValue.difficulty,
      dureeRecette: formValue.dureeRecette, // Ajout de la durée
      utilisateurId: currentUser.idUserDto
    };

    this.recetteService.addRecipe(payload).subscribe({
      next: () => {
        alert('Recette ajoutée avec succès !');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error("Erreur lors de l'ajout de la recette", err);
        alert("Une erreur est survenue lors de l'ajout de la recette.");
      }
    });
  }
}