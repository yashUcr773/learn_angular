import { Component, inject, Input, } from '@angular/core';
import { Task } from '../../../utils/types.utils';
import { TaskService } from '../../../services/tasks.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    @Input('task') task!: Task;

    private taskService = inject(TaskService);

    onComplete() {
        this.taskService.removeTask(this.task.id);
    }
}
