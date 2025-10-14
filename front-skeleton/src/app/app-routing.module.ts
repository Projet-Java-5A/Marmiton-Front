import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AddRecetteComponent } from "./add-recette/add-recette.component";

import { roleGuard } from "./guards/role.guard";

// Supposons que vous ayez un composant pour l'administration
// import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  // --- Routes publiques accessibles à tous ---
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },

  // --- Route protégée pour les utilisateurs connectés (User et Admin) ---
  { 
    path: "add-recette", 
    component: AddRecetteComponent,
    canActivate: [roleGuard], // 2. Appliquez le Guard ici
    data: { expectedRole: 'User' } // 3. Spécifiez le rôle minimum requis
  },

  /*
  // --- Exemple de route protégée uniquement pour les Admins ---
  { 
    path: "admin", 
    component: AdminPanelComponent, // Vous devrez créer ce composant
    canActivate: [roleGuard],
    data: { expectedRole: 'Admin' } 
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}