import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input() public placeholder: string = '';
  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(term: string) {
    this.debouncer.next(term);
  }

  constructor() {}

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy() {
    this.debouncerSuscription?.unsubscribe();
  }
}
