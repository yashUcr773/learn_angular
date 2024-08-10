import { Component, inject, OnInit, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../services/tasks.services';
import { Task, TaskStatus } from '../task.model';

@Component({
    selector: 'app-tasks-list',
    standalone: true,
    templateUrl: './tasks-list.component.html',
    styleUrl: './tasks-list.component.css',
    imports: [TaskItemComponent],
})
export class TasksListComponent {

    selectedFilter = signal<'ALL' | TaskStatus>('ALL');
    private taskService = inject(TasksService);

    get tasks() {
        if (this.selectedFilter() === 'ALL') {
            return this.taskService.getAllTasks();
        }
        return this.taskService.getTasksByStatus(this.selectedFilter() as TaskStatus);
    }


    onChangeTasksFilter(filter: string) {
        this.selectedFilter.set(filter as 'ALL' | TaskStatus);
    }
}
