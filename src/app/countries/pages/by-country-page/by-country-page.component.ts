import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit{

  countries: Country[] = [];
  initialValue: string = '';

  constructor( private _countriesService: CountriesService){}
  
  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
  }

  searchByCountry( term : string ){
    this._countriesService.searchByCountry(term).subscribe(
      countries => {
        this.countries = countries;
      });
  }
  
}
