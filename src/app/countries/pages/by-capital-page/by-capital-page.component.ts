import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit{

  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor( private _countriesService: CountriesService){}
  

  //Metodos
  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCapital.countries;
    this.initialValue = this._countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term : string ){

    this.isLoading = true;

    this._countriesService.searchByCapital(term).subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
