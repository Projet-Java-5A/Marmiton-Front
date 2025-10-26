import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetteService, Recette } from '../recette/recette.service';
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
      prix: [0, [Validators.required, Validators.min(0)]],
      contenu: ['', Validators.required],
      // Ingredients and Ustensiles are not editable in this version
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
        this.recetteForm.patchValue({
          nom: recette.nom,
          imageUrl: recette.imageUrl,
          duree: recette.duree,
          difficulte: recette.difficulte,
          prix: recette.prix,
          contenu: recette.contenu
        });
      }
    });
  }

  onSubmit(): void {
    if (this.recetteForm.valid && this.recetteId) {
      const updatedRecette: Recette = {
        id: this.recetteId,
        ...this.recetteForm.value,
        ingredients: [], // Not editable in this form
        ustensiles: []    // Not editable in this form
      };
      this.recetteService.updateRecette(this.recetteId, updatedRecette).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
