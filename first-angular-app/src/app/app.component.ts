import { Component } from '@angular/core';
import { DUMMY_USERS } from './components/user/dummy-users';
import { User } from './utils/types.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'first-angular-app';
    users = DUMMY_USERS;
    selectedUser?: User;

    onUserSelect(user: User) {
        this.selectedUser = user;
    }
}
