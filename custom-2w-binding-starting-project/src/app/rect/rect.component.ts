import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
    selector: 'app-rect',
    standalone: true,
    imports: [],
    templateUrl: './rect.component.html',
    styleUrl: './rect.component.css',
})
export class RectComponent {

    // @Input({ required: true }) rectSize!: { width: string, height: string };
    // @Output() rectSizeChange = new EventEmitter<{ width: string, height: string }>();

    rectSize = model.required<{ width: string, height: string }>();

    onReset() {
        this.rectSize.set({ width: '420', height: '69' });
    }
}
