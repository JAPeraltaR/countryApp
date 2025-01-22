import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interfaces';
import { CacheStore } from '../../interfaces/cache-store.interface';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit{

  public capitals: Country[] = [];

  public initialValue: string = '';

  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.capitals = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.countriesService.searchByCapital(term)
                         .subscribe( capital => {
                            this.capitals = capital;
                            this.isLoading = false;
                         });
  }

}
