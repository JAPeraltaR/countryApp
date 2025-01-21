import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, Translation } from '../../interfaces/countries.interfaces';


@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit{

  public country!: Country;

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private countrieService: CountriesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.countrieService.searchContryByAlphaCode( id ))
    ).subscribe( resp => {
        if( !resp ) return this.router.navigateByUrl('');
        return this.country = resp;
    });



  }

}
