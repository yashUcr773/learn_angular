import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { dummyCanMatchGuard, dummyCanMatchGuardClass, resolveTitle, resolveUsername, UserTasksComponent } from "./users/user-tasks/user-tasks.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Tasks'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        data: { message: 'This is a custom message' },
        resolve: {
            userName: resolveUsername
        },
        title: resolveTitle,
        canMatch: [dummyCanMatchGuard, dummyCanMatchGuardClass],
        loadChildren: () => import('./user-tasks.route').then(module => module.routes)
    },
    {
        path: '**',
        component: NoTaskComponent
    }
]