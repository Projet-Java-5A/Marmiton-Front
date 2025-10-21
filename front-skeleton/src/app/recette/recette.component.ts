import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recette, RecetteService } from '../recette/recette.service';
import { switchMap } from 'rxjs';
import { CommonModule, Location } from '@angular/common'; 

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {
  recette: Recette | undefined;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private location: Location 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.recetteService.getRecetteById(id);
      })
    ).subscribe(recette => this.recette = recette);
  }

  goBack(): void {
    this.location.back();
  }
}