import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.services';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
    private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
    private taskService = inject(TasksService);

    onAddTask(title: string, description: string) {
        this.taskService.addTask({ id: Math.random().toString().substring(2, 8), title, description, status: 'OPEN' });
        this.formEl()?.nativeElement.reset();
    }
}
