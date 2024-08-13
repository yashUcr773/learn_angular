import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, CanMatchFn, RedirectCommand, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
    private tasksService = inject(TasksService);
    private router = inject(Router);
    userId = input.required<string>();
    enteredTitle = signal('');
    enteredSummary = signal('');
    enteredDate = signal('');

    onSubmit() {
        this.tasksService.addTask(
            {
                title: this.enteredTitle(),
                summary: this.enteredSummary(),
                date: this.enteredDate(),
            },
            this.userId()
        );
        this.enteredTitle.set('');
        this.enteredSummary.set('');
        this.enteredDate.set('');

        this.router.navigate(['users', this.userId()], { replaceUrl: true });
    }
}

export const canDeactivateGuard: CanDeactivateFn<NewTaskComponent> = (component) => {
    if (component.enteredTitle() || component.enteredSummary() || component.enteredDate()) {
        return window.confirm('Do you really want to leave?');
    }
    return true
}
