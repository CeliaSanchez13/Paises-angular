import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs/operators';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit{

  country?: Country;

  constructor( private activatedRoute:ActivatedRoute,
               private _countryService:CountriesService,
               private route:Router ){}

  ngOnInit(): void {
    /*this.activatedRoute.params.subscribe( //Capturamos el valor de respuesta
      ( { id } ) => {
        this._countryService.searchCountryByAlphaCode( id ).subscribe( //Necesitamos capturar el valor de respuesta sobre el resultado anterior.
          country => {
            //Te devuelve un array con el contenido sobre el id obtenido de la url
            console.log(country);
          }
        )
      }
    )*/

    this.activatedRoute.params.pipe(

        switchMap( ({ id }) => this._countryService.searchCountryByAlphaCode(id)) //Recibe el valor anterior para sacar un nuevo observable
    
      ).subscribe( country  => {
        if( !country ) return this.route.navigateByUrl('')

      return this.country = country;
       
      });

  }
}
