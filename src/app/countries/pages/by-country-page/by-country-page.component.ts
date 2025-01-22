import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'v-by-country-page',
  standalone: false,
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  @Input()
  public initialValue!: string;

  constructor( private countriesService: CountriesService ){ }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry( term: string ): void{
    this.isLoading = true;
    this.countriesService.searchByCountry(term)
                         .subscribe(country => {
                          this.countries = country;
                          this.isLoading = false;
                         });
  }

}
