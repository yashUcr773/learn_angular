import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "../tasks/task.model";

@Injectable({ providedIn: 'root' })
export class TasksService {
    tasks = signal<Task[]>([])
    allTasks = this.tasks.asReadonly();

    addTask(task: Task) {
        this.tasks.update(prev => [...prev, task]);
    }

    updateTask(taskId: string, status: TaskStatus) {
        this.tasks.update(oldTasks => oldTasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        ));
    }

    getTasksByStatus(status: TaskStatus) {
        if (status === 'OPEN') return this.getOpenTasks();
        if (status === 'DONE') return this.getCompletedTasks();
        return this.getInprogressTasks();
    }

    getOpenTasks() {
        return this.allTasks().filter(task => task.status === 'OPEN');
    }

    getCompletedTasks() {
        return this.allTasks().filter(task => task.status === 'DONE');
    }

    getInprogressTasks() {
        return this.allTasks().filter(task => task.status === 'IN_PROGRESS');
    }

}