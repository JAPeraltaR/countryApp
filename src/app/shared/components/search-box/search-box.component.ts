import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { NativeName } from '../../../countries/interfaces/country.interfaces';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject();

  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder!: string;

  @Input()
  public initialValue!: string;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild("txtInput")
  public initial!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value: string ): void{
    this.onValue.emit(value);
  }

  onKeyPress( value: string ){
    this.onDebounce.next( value );
  }
}
