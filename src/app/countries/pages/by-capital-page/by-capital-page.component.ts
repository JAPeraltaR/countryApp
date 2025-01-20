import { Component, Input } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  searchByCapital( term: string): void{
    console.log('Desde By_capital Page');
    console.log(term);
  }

}
