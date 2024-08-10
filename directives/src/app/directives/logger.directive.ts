import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[appLogger]',
    standalone: true,
    host: {
        '(click)': 'log($event)'
    }
})
export class LoggerDirective {

    private elementRef = inject(ElementRef);

    constructor() { }

    log(event: MouseEvent) {
        console.log('Element clicked: ', this.elementRef.nativeElement);
    }
}
