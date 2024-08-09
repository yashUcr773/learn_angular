import { Injectable } from "@angular/core";
import { Task } from "../utils/types.utils";

@Injectable({ providedIn: "root" })
export class TaskService {
    private tasks: Task[] = [];

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    }

    getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    addTask(task: Task) {
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    removeTask(taskId: string) {
        this.tasks = this.tasks.filter(d_task => d_task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return this.tasks;
    }

}