import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit{
  
  countries: Country[] = [];
  regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']; //Type declarado arriba
  selectedRegion?: Region;

  constructor( private _countriesService: CountriesService){}
  
  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region : Region ){

    this.selectedRegion = region;
    this._countriesService.searchByRegion(region).subscribe(
      regions => {
        this.countries = regions;
      });
  }
}
