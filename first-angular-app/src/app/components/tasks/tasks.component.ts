import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task, User } from '../../utils/types.utils';
import { TaskComponent } from "./task/task.component";
import { DUMMY_TASKS } from './dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskService } from '../../services/tasks.service';


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [TaskComponent, NewTaskComponent],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    @Input('selectedUser') selectedUser!: User;
    showAddTaskModal = false

    constructor(private taskService: TaskService) { }

    get userTasks() {
        return this.taskService.getUserTasks(this.selectedUser?.id)
    }

    onNewTask() {
        this.showAddTaskModal = true;
    }

    onCloseModal() {
        this.showAddTaskModal = false;
    }

}
