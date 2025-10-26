import { Component, OnInit } from '@angular/core';
import { RecetteService, Recette } from '../recette/recette.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  pendingRecettes: Recette[] = [];

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.loadPendingRecettes();
  }

  loadPendingRecettes(): void {
    this.recetteService.getPendingRecettes().subscribe(recettes => {
      this.pendingRecettes = recettes;
    });
  }

  approve(id: number): void {
    this.recetteService.updateRecetteStatus(id, 'APPROVED').subscribe(() => {
      this.pendingRecettes = this.pendingRecettes.filter(r => r.id !== id);
    });
  }

  reject(id: number): void {
    this.recetteService.updateRecetteStatus(id, 'REJECTED').subscribe(() => {
      this.pendingRecettes = this.pendingRecettes.filter(r => r.id !== id);
    });
  }

  delete(id: number): void {
    this.recetteService.deleteRecette(id).subscribe(() => {
      this.pendingRecettes = this.pendingRecettes.filter(r => r.id !== id);
    });
  }
}
