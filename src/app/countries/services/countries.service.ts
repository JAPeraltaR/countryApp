import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of } from "rxjs";
import { Country } from '../interfaces/countries.interfaces';

@Injectable({
  providedIn: 'root'
})

export class CountriesService{

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor( private httpClient: HttpClient ) { }

  private getCountriesRequest( url: string ): Observable<Country[]>{
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) ),
      delay(1000)
    )
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url );
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url );
  }

  searchByRegion( region: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url );
  }

  searchContryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.httpClient.get<Country[]>( url ).pipe(
      map( countries => countries.length > 0? countries[0] : null),
      catchError( () => of(null) )
    );
  }
}
