import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';
import {RecetteService, Recette, Ingredient, CategorieDto} from '../recette/recette.service';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';
import { IngredientService } from '../services/ingredient.service';
import { IngredientList } from '../models/ingredient';

@Component({
  selector: 'app-edit-recette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.scss']
})
export class EditRecetteComponent implements OnInit {

  recetteForm!: FormGroup;
  recetteId?: number;
  recette?: Recette;
  priceRanges: string[] = ['1-10€', '10-20€', '20-30€', '30-40€', '40-50€', '50+€'];
  stars: number[] = [1, 2, 3, 4, 5];
  allIngredients: IngredientList[] = [];

  constructor(
    private fb: FormBuilder,
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.allIngredients = ingredients;
    });

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => parseInt(id!, 10)),
      switchMap(id => {
        this.recetteId = id;
        return this.recetteService.getAllRecettesAdmin();
      }),
      map(recettes => recettes.find(r => r.id === this.recetteId))
    ).subscribe(recette => {
      if (recette) {
        this.recette = recette;
        this.initForm(recette);
      }
    });
  }

  initForm(recette: Recette): void {
    this.recetteForm = this.fb.group({
      nom: [recette.nom, Validators.required],
      // LA MODIFICATION EST ICI : Le validateur Validators.required a été supprimé.
      imageUrl: [recette.imageUrl], 
      duree: [recette.duree, [Validators.required, Validators.min(1)]],
      difficulte: [recette.difficulte, [Validators.required, Validators.min(1), Validators.max(5)]],
      prix: [this.mapPriceToRange(recette.prix), [Validators.required]],
      contenu: [recette.contenu, Validators.required],
      ingredients: this.fb.array(
        recette.ingredients.map(ingredient => this.fb.group({
          id: [ingredient.id],
          nom: [ingredient.nom, Validators.required],
          quantite: [ingredient.quantite, Validators.required],
          categorie: [ingredient.categorie]
        }))
      )
    });

    // On garde cette partie qui est une bonne pratique pour les cas complexes.
    this.recetteForm.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  mapPriceToRange(price: number): string {
    if (price >= 1 && price < 10) return '1-10€';
    if (price >= 10 && price < 20) return '10-20€';
    if (price >= 20 && price < 30) return '20-30€';
    if (price >= 30 && price < 40) return '30-40€';
    if (price >= 40 && price < 50) return '40-50€';
    return '50+€'; // Pour 50 et plus
  }

  mapRangeToPrice(range: string): number {
    if (range === '50+€') return 50;
    return parseInt(range.split('-')[0], 10);
  }

  get ingredients(): FormArray {
    return this.recetteForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    if (this.allIngredients.length > 0) {
      const defaultIngredient = this.allIngredients[0];
      this.ingredients.push(this.fb.group({
        id: [defaultIngredient.id_ingredient],
        nom: [defaultIngredient.nom_ingredient, Validators.required],
        quantite: ['', Validators.required],
        categorie: [null]
      }));
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onIngredientChange(event: any, index: number): void {
    const selectedIngredientId = parseInt(event.target.value, 10);
    const selectedIngredient = this.allIngredients.find(ing => ing.id_ingredient == selectedIngredientId);
    if (selectedIngredient) {
      const ingredientGroup = this.ingredients.at(index) as FormGroup;
      ingredientGroup.get('nom')?.setValue(selectedIngredient.nom_ingredient);
    }
  }

  onSubmit(): void {
    // La condition recetteForm.valid fonctionnera désormais correctement
    if (this.recetteForm.valid && this.recetteId && this.recette) {
      const formValue = this.recetteForm.value;

      const updatedIngredients: Ingredient[] = formValue.ingredients.map((ing: any) => {
        const selectedIngredient = this.allIngredients.find(allIng => allIng.id_ingredient === ing.id);
        return {
          id: ing.id,
          nom: selectedIngredient ? selectedIngredient.nom_ingredient : ing.nom,
          quantite: ing.quantite,
          categorie: { idCategorieDto: selectedIngredient ? selectedIngredient.id_categorie : 0, nomCategorieDto: '' },
        };
      });

      const updatedRecette: Recette = {
        ...this.recette,
        id: this.recetteId,
        nom: formValue.nom,
        imageUrl: formValue.imageUrl,
        duree: formValue.duree,
        difficulte: formValue.difficulte,
        prix: this.mapRangeToPrice(formValue.prix),
        contenu: formValue.contenu,
        ingredients: updatedIngredients,
        ustensiles: this.recette.ustensiles,
      };

      this.recetteService.updateRecette(this.recetteId, updatedRecette).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }

  approve(): void {
    if (this.recetteId) {
      this.recetteService.updateRecetteStatus(this.recetteId, 'APPROVED').subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Approve failed', err);
        }
      });
    }
  }
}