import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string =  'https://restcountries.com/v3.1';

  //Guardar en la cache los paises si ya fueron cargados
  cacheStore: CacheStore = {
    byCapital:{ term: '', countries:[]},
    byCountries:{ term: '', countries:[]},
    byRegion:{ region: '', countries:[]}
  }

  constructor( private http: HttpClient ) {
    //Cuando el servicio se carga...
    this.loadFromLocalStorage();

   }

  private getCountriesRequest(url:string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
            .pipe(
              catchError( () => of([]) )
            );
  }

  //Guardar en localStorage para que se conserven los datos si actualizamos la pagina
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage(){
    if ( !localStorage.getItem('cacheStore') ) return; //Si no exite, salimos...

    //Si si existe...

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  //Antes de optimizar

  searchCountryByAlphaCode( code:string):Observable<Country | null>{
    
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map ( countries => countries.length > 0 ? countries[0]: null),
        catchError( () => of(null) )
      );
  }

  //BUSQUEDA DE ELEMENTOS
  searchByCapital( term: string ): Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`)
            .pipe(
              tap( countries => this.cacheStore.byCapital = { term, countries }), //No afecta en la respuesta del get, lo aprovechamos para guardar la info en la cache (en este caso los paises que devuelva)
              tap( () => this.saveToLocalStorage()) //Guardamos la info en el localStorage
            )
  }

  searchByCountry( term: string ): Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`)
            .pipe(
              tap( countries => this.cacheStore.byCountries = { term, countries }) ,
              tap( () => this.saveToLocalStorage()) 
            )
  }

  searchByRegion( region : Region ): Observable<Country[]>{
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`)
            .pipe(
              tap( countries => this.cacheStore.byRegion = { region, countries }) ,
              tap( () => this.saveToLocalStorage()) 
            )
  }
}
