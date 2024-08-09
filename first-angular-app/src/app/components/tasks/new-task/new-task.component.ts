import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Task, TaskFormData, User } from '../../../utils/types.utils';
import { TaskService } from '../../../services/tasks.service';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
    @Output() onClose = new EventEmitter<void>();
    @Input() user!: User;

    private taskService = inject(TaskService);

    formData = signal<TaskFormData>({
        title: '',
        summary: '',
        dueDate: ''
    })

    handleCancel() {
        this.onClose.emit();
    }

    handleCreate(e: Event) {
        e.preventDefault();
        const task: Task = {
            id: 't' + Math.floor(Math.random() * 1000),
            userId: this.user.id,
            title: this.formData().title,
            summary: this.formData().summary,
            dueDate: this.formData().dueDate,
        }
        this.taskService.addTask(task);
        this.onClose.emit()
    }

}
