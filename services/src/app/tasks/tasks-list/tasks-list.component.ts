import { Component, inject, OnInit, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
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
    tasks = []

    onChangeTasksFilter(filter: string) {
        this.selectedFilter.set(filter as 'ALL' | TaskStatus);
    }
}
