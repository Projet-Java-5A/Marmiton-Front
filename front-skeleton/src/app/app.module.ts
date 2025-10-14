import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { HttpClientModule } from "@angular/common/http"
import { LoginComponent } from "./login/login.component"
import { AddRecetteComponent } from "./add-recette/add-recette.component"
import { MatToolbar } from "@angular/material/toolbar";
import { FooterComponent } from "footer/footer.component"
import { CarouselRecettesComponent } from './carousel-recettes/carousel-recettes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, FooterComponent, CarouselRecettesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    LoginComponent,
    AddRecetteComponent,
    MatToolbar,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
