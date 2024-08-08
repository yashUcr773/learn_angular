import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
})
export class UserComponent {
    @Input('user') user!: { id: string; name: string; avatar: string };

    @Output('selectedUser') selectedUser = new EventEmitter<{ id: string, name: string, avatar: string }>();

    get userAvatar() {
        return 'users/' + this.user?.avatar;
    }

    onSelectUser() {
        this.selectedUser.emit(this.user);
    }
}
