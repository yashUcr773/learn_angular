import { Component, computed, inject, OnInit, signal } from '@angular/core';

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
    tasks = computed(() => {
        const filter = this.selectedFilter();
        return filter === 'ALL' ? this.taskService.allTasks() : this.taskService.getTasksByStatus(filter);
    });

    onChangeTasksFilter(filter: string) {
        this.selectedFilter.set(filter as 'ALL' | TaskStatus);
    }
}
