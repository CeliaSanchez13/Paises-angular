import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './shared/pages/home-pages/home-pages.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactComponent } from './shared/pages/contact/contact.component';

const routes: Routes = [
  //{path: 'home', component:HomePagesComponent},
  {path: 'about', component:AboutPageComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'countries', loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )},
  {path: '**', redirectTo: 'countries'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
