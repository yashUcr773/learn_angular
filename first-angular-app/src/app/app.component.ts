import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './components/user/dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from "./components/tasks/tasks.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, UserComponent, CommonModule, TasksComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'first-angular-app';
    users = DUMMY_USERS;
    selectedUser?: { id: string; name: string; avatar: string };

    onUserSelect(user: { id: string; name: string; avatar: string }) {
        this.selectedUser = user;
    }
}
