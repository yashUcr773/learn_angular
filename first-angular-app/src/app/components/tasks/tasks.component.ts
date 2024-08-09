import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task, User } from '../../utils/types.utils';
import { TaskComponent } from "./task/task.component";
import { DUMMY_TASKS } from './dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [TaskComponent, NewTaskComponent],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnChanges {
    @Input('selectedUser') selectedUser?: User;
    tasks: Task[] = DUMMY_TASKS;
    showAddTaskModal = false

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedUser']) {
            this.tasks = DUMMY_TASKS.filter(task => task.userId === this.selectedUser?.id);
        }
    }

    onNewTask() {
        this.showAddTaskModal = true;
    }

    onCloseModal() {
        this.showAddTaskModal = false;
    }

    onTaskComplete(task: Task) {
        this.tasks = this.tasks.filter(d_task => d_task.id !== task.id);
    }

    onTaskAdded(task: Task) {
        this.showAddTaskModal = false;
        DUMMY_TASKS.push(task);
        this.tasks = DUMMY_TASKS.filter(task => task.userId === this.selectedUser?.id);
    }

}
