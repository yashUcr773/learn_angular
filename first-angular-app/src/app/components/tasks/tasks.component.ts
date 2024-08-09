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
export class TasksComponent implements OnChanges {
    @Input('selectedUser') selectedUser!: User;
    tasks: Task[] = DUMMY_TASKS;
    showAddTaskModal = false

    constructor(private taskService: TaskService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedUser']) {
            this.tasks = this.taskService.getUserTasks(this.selectedUser?.id)
        }
    }

    onNewTask() {
        this.showAddTaskModal = true;
    }

    onCloseModal() {
        this.showAddTaskModal = false;
        this.tasks = this.taskService.getUserTasks(this.selectedUser?.id)

    }

    onTaskComplete(task: Task) {
        this.tasks = this.taskService.removeTask(task.id);
    }

}
