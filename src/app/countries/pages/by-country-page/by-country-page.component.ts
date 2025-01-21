import { Component, Input } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'v-by-country-page',
  standalone: false,
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ){ }

  searchByCountry( term: string ): void{
    this.countriesService.searchByCountry(term)
                         .subscribe(country => this.countries = country);
  }

}
