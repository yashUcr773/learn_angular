import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Task, TaskFormData, User } from '../../../utils/types.utils';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
    @Output() onTaskAdded = new EventEmitter<Task>();
    @Output() onCancel = new EventEmitter<void>();
    @Input() user!: User;

    formData = signal<TaskFormData>({
        title: '',
        summary: '',
        dueDate: ''
    })

    handleCancel() {
        this.onCancel.emit();
    }

    handleCreate(e: Event) {
        e.preventDefault();
        console.log("handleCreate")
        const task: Task = {
            id: 't' + Math.floor(Math.random() * 1000),
            userId: this.user.id,
            title: this.formData().title,
            summary: this.formData().summary,
            dueDate: this.formData().dueDate,
        }
        this.onTaskAdded.emit(task)
    }

}
