import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { dummyCanMatchGuard, dummyCanMatchGuardClass, resolveTitle, resolveUsername, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { resolveUserTasks, TasksComponent } from "./tasks/tasks.component";
import { canDeactivateGuard, NewTaskComponent } from "./tasks/new-task/new-task.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Tasks'
    },
    // {
    //     path: 'tasks',
    //     component: TaskComponent
    // },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        data: { message: 'This is a custom message' },
        resolve: {
            userName: resolveUsername
        },
        title: resolveTitle,
        canMatch: [dummyCanMatchGuard, dummyCanMatchGuardClass],
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full',
            },
            {
                path: 'tasks', // <your-domain>/users/<uid>/tasks
                component: TasksComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    userTasks: resolveUserTasks,
                },
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                canDeactivate: [canDeactivateGuard]
            },
        ]
    },
    {
        path: '**',
        component: NoTaskComponent
    }
]