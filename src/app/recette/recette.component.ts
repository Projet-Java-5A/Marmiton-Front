import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recette, RecetteService } from './recette.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'recette',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './recette.component.html',
  styleUrl: './recette.component.scss'
})
export class RecetteComponent implements OnInit {
  recette: Recette | undefined;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recetteService.getRecetteById(+id).subscribe({
        next: (data) => {
          this.recette = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la recette', err);
          // Optionnel : rediriger vers une page 404
        }
      });
    }
  }
}