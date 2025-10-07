import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

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
    MatSliderModule
  ],
  templateUrl: './add-recette.component.html',
  styleUrl: './add-recette.component.scss'
})
export class AddRecetteComponent {
  recetteForm: FormGroup;
  ingredientsList: string[] = ["test"]; //TODO faire l'appel API pour récuperer les ingrédients

  constructor(private fb: FormBuilder) {
    this.recetteForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: [[], Validators.required],
      image: [''],
      steps: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      difficulty: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.recetteForm.valid) {
      console.log(this.recetteForm.value);
      // TODO: Implement recipe submission logic
    }
  }
}
