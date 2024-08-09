import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../utils/types.utils';
import { CardComponent } from "../../ui/card/card.component";
import { DatePipe } from '@angular/common';
import { TaskService } from '../../../services/tasks.service';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CardComponent, DatePipe],
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
