import { Component, Input } from '@angular/core';
import { User } from '../../utils/types.utils';
import { TaskService } from '../../services/tasks.service';


@Component({
    selector: 'app-tasks',
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
