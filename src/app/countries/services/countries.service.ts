import { CacheStore } from './../interfaces/cache-store.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, count, map, Observable, of, tap } from "rxjs";
import { Country } from '../interfaces/country.interfaces';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountriesService{

  public cacheStore: CacheStore = {
    byCapital:  { term: '', countries: [] },
    byCountry:  { term: '', countries: []},
    byRegion:   { region: '', countries: []}
  }

  private apiUrl:string = 'https://restcountries.com/v3.1';

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadToLocalStorage() {
    if(!localStorage.getItem( 'cacheStore' )) return;
    this.cacheStore = JSON.parse(localStorage.getItem( 'cacheStore' )!);
  }

  constructor( private httpClient: HttpClient ) {
    this.loadToLocalStorage();
  }

  private getCountriesRequest( url: string ): Observable<Country[]>{
    // take: Auomaticamente desuscribe cuando se ingresa un valor(para el get).
    // delay(2000)
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) )
    )
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byCapital = { term, countries }),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byCountry = { term, countries }),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchByRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage() )
    );
  }

  searchContryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.httpClient.get<Country[]>( url ).pipe(
      map( countries => countries.length > 0? countries[0] : null),
      catchError( () => of(null) )
    );
  }
}
