import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../utils/types.utils';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [],
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
