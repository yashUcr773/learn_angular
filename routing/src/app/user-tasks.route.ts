import { Routes } from "@angular/router";
import { resolveUserTasks } from "./tasks/tasks.component";
import { canDeactivateGuard, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { TasksService } from "./tasks/tasks.service";

export const routes: Routes = [
    {
        path: "",
        providers: [TasksService],
        children: [{
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full',
        },
        {
            path: 'tasks', // <your-domain>/users/<uid>/tasks
            runGuardsAndResolvers: 'always',
            resolve: {
                userTasks: resolveUserTasks,
            },
            loadComponent: () => import('./tasks/tasks.component').then(module => module.TasksComponent),
        },
        {
            path: 'tasks/new',
            component: NewTaskComponent,
            canDeactivate: [canDeactivateGuard],
        },],
    }
]