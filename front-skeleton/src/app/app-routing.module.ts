import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { LoginComponent } from "./login/login.component"
import { RecetteComponent } from "./recette/recette.component"
import { AddRecetteComponent } from "./add-recette/add-recette.component"
import { roleGuard } from "./guards/role.guard";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { 
    path: "add-recette", 
    component: AddRecetteComponent,
    canActivate: [roleGuard], 
    data: { expectedRole: 'User' } 
  },
  { 
    path: "admin", 
    component: AdminPanelComponent, 
    canActivate: [roleGuard],
    data: { expectedRole: 'Admin' } 
  },]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
