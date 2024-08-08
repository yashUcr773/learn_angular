import { Component, Input } from '@angular/core';
import { Task } from '../../utils/types.utils';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    @Input('task') task!: Task;

    onTaskComplete() {

    }
}
