import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../utils/types.utils';
import { CardComponent } from "../../ui/card/card.component";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CardComponent, DatePipe],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    @Input('task') task!: Task;
    @Output('onTaskComplete') onTaskComplete = new EventEmitter<Task>();

    onComplete() {
        this.onTaskComplete.emit(this.task);
    }
}
