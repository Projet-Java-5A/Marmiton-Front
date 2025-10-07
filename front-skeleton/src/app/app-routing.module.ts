import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { LoginComponent } from "./login/login.component"
import { AddRecetteComponent } from "./add-recette/add-recette.component"
import { RecetteComponent } from './recette/recette.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "add-recette", component: AddRecetteComponent },
  { path: 'recette/:id', component: RecetteComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


