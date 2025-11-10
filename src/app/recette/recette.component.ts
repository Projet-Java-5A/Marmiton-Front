import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recette, RecetteService } from './recette.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'recette',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './recette.component.html',
  styleUrl: './recette.component.scss'
})
export class RecetteComponent implements OnInit {
  recette: Recette | undefined;

  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recetteService.getRecetteById(+id).subscribe({
        next: (data) => {
          this.recette = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la recette', err);
        }
      });
    }
  }

  onEdit(): void {
    if (this.recette) {
      this.router.navigate(['/admin/edit-recette', this.recette.id]);
    }
  }

  onDelete(): void {
    if (this.recette && confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      this.recetteService.deleteRecette(this.recette.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la recette', err);
          alert('Erreur lors de la suppression de la recette');
        }
      });
    }
  }
}