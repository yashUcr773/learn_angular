import { Component, ContentChild, ElementRef, input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-control',
    standalone: true,
    imports: [],
    templateUrl: './control.component.html',
    styleUrl: './control.component.css',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'control',
        '(click)': 'onClick($event)',
    },
})
export class ControlComponent {
    label = input.required<string>()
    @ContentChild('input') control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>

    onClick(event: MouseEvent) {
        console.log(this.control?.nativeElement.value)
    }

}
