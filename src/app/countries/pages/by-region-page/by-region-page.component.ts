import { Component, Input } from '@angular/core';
import { Country, Region } from '../../interfaces/countries.interfaces';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {

  public regions: Country[] = [];

  constructor( private countryService: CountriesService ){ }

  searchByRegion( region: string ): void {
    this.countryService.searchByRegion( region )
                       .subscribe( region => this.regions = region);
  }

}
