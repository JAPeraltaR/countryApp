import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './searchBox.component.html',
  styleUrl: './searchBox.component.css'
})
export class SearchBoxComponent {

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder!: string;

  emitValue(value: string): void{
    this.onValue.emit(value);
  }
}
