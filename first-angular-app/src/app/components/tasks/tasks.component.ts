import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task, User } from '../../utils/types.utils';
import { TaskComponent } from "../task/task.component";
import { DUMMY_TASKS } from './dummy-tasks';


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [TaskComponent],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    @Input('selectedUser') selectedUser?: User;

    get userTasks() {
        return DUMMY_TASKS.filter(task => task.userId === this.selectedUser?.id);
    }

    onNewTask() {

    }

    onTaskToggle(task: Task) {

    }

    onTaskDelete(task: Task) {
    }
}
