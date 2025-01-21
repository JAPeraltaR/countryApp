import { Component, Input } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  public capitals: Country[] = [];

  constructor( private countriesService: CountriesService ){}

  searchByCapital( term: string ): void {
    this.countriesService.searchByCapital(term)
                         .subscribe( capital => this.capitals = capital );
  }

}
