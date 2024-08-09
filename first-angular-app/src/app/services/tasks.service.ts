import { Injectable } from "@angular/core";
import { Task } from "../utils/types.utils";
import { DUMMY_TASKS } from "../components/tasks/dummy-tasks";

@Injectable({ providedIn: "root" })
export class TaskService {
    private tasks: Task[] = DUMMY_TASKS;

    getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    removeTask(taskId: string) {
        this.tasks = this.tasks.filter(d_task => d_task.id !== taskId);
        return this.tasks;
    }

}