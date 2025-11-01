import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';
import {RecetteService, Recette, Ingredient, CategorieDto} from '../recette/recette.service';
import { CommonModule } from '@angular/common';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-recette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.scss']
})
export class EditRecetteComponent implements OnInit {

  recetteForm: FormGroup;
  recetteId?: number;
  recette?: Recette;
  priceRanges: string[] = ['1-10€', '10-20€', '20-30€', '30-40€', '40-50€', '50+€'];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recetteForm = this.fb.group({
      nom: ['', Validators.required],
      imageUrl: ['', Validators.required],
      duree: [0, [Validators.required, Validators.min(1)]],
      difficulte: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      prix: ['', [Validators.required]],
      contenu: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => parseInt(id!, 10)),
      switchMap(id => {
        this.recetteId = id;
        // Workaround: Fetch all and find by ID
        return this.recetteService.getAllRecettesAdmin();
      }),
      map(recettes => recettes.find(r => r.id === this.recetteId))
    ).subscribe(recette => {
      if (recette) {
        this.recette = recette;
        this.recetteForm.patchValue({
          nom: recette.nom,
          imageUrl: recette.imageUrl,
          duree: recette.duree,
          difficulte: recette.difficulte,
          prix: this.mapPriceToRange(recette.prix),
          contenu: recette.contenu
        });
        recette.ingredients.forEach(ingredient => {
          this.ingredients.push(this.fb.group({
            id: [ingredient.id],
            nom: [ingredient.nom, Validators.required],
            quantite: [ingredient.quantite, Validators.required],
            categorie: [ingredient.categorie]
          }));
        });
      }
    });
  }

  mapPriceToRange(price: number): string {
    if (price <= 10) return '1-10€';
    if (price <= 20) return '10-20€';
    if (price <= 30) return '20-30€';
    if (price <= 40) return '30-40€';
    if (price <= 50) return '40-50€';
    return '50+€';
  }

  mapRangeToPrice(range: string): number {
    if (range === '50+€') return 50;
    return parseInt(range.split('-')[0], 10);
  }

  get ingredients(): FormArray {
    return this.recetteForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    const defaultCategory: CategorieDto = { idCategorieDto: 9, nomCategorieDto: 'Autre' };
    this.ingredients.push(this.fb.group({
      id: [0], // 0 for new ingredient
      nom: ['', Validators.required],
      quantite: ['', Validators.required],
      categorie: [defaultCategory]
    }));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {
    if (this.recetteForm.valid && this.recetteId && this.recette) {
      const formValue = this.recetteForm.value;

      const updatedIngredients: Ingredient[] = formValue.ingredients.map((ing: any) => ({
          id: ing.id,
          nom: ing.nom,
          quantite: ing.quantite,
          categorie: ing.categorie,
      }));

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
        ustensiles: this.recette.ustensiles, // Keep original ustensiles
      };

      this.recetteService.updateRecette(this.recetteId, updatedRecette).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Update failed', err);
          // Optionally show an error message to the user
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
