import { Injectable } from "@angular/core";
import { Task, TaskStatus } from "../tasks/task.model";

@Injectable({ providedIn: 'root' })
export class TasksService {
    tasks: Task[] = []

    getAllTasks() {
        return this.tasks;
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    updateTask(taskId: string, status: TaskStatus) {
        this.tasks = this.tasks.map(task => {
            if (task.id === taskId) return { ...task, status }
            return task
        });
    }

    getOpenTasks() {
        return this.tasks.filter(task => task.status === 'OPEN');
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.status === 'DONE');
    }

    getTasksByStatus(status: TaskStatus) {
        if (status === 'OPEN') return this.getOpenTasks();
        if (status === 'DONE') return this.getCompletedTasks();
        return this.getInprogressTasks();
    }

    getInprogressTasks() {
        return this.tasks.filter(task => task.status === 'IN_PROGRESS');
    }

}