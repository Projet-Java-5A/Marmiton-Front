import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecetteService, Recette } from '../recette/recette.service';
import { Observable, switchMap, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results$!: Observable<Recette[]>;
  searchTerm: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    this.results$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        this.searchTerm = params.get('q');
        if (this.searchTerm) {
          //console.log(`Recherche des recettes pour "${this.searchTerm}" via le service.`);
          return this.recetteService.searchRecettes(this.searchTerm);
        } else {
          return of([]);
        }
      })
    );
  }
}
