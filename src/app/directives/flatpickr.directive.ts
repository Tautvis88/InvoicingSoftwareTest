import { Directive, ElementRef, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';

@Directive({
  selector: '[appFlatpickr]',
})
export class FlatpickrDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    flatpickr(this.elementRef.nativeElement, {
      locale: {
        firstDayOfWeek: 1,
      },
      weekNumbers: true,
      showMonths: 1,
      dateFormat: 'Y-m-d',
      minDate: '2020-01',
    });
  }
}
