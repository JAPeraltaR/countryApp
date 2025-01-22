import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interfaces';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,
  templateUrl: './by-region-page.component.html'
})

export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];

  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];

  public selectedRegion?: Region;

  @Input()
  public isLoading: boolean = false;

  constructor( private countryService: CountriesService ){ }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ): void {
    this.selectedRegion = region;
    this.countryService.searchByRegion( region )
    .subscribe( country => {
     this.countries = country;
     this.isLoading = false;
    });
  }

}
