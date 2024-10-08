import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../utils/types.utils';
import { CardComponent } from '../shared/card/card.component';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
})
export class UserComponent {
    @Input('user') user!: User;
    @Input('selected') selected = false;
    @Output('selectedUser') selectedUser = new EventEmitter<{ id: string, name: string, avatar: string }>();

    get userAvatar() {
        return 'users/' + this.user?.avatar;
    }

    onSelectUser() {
        this.selectedUser.emit(this.user);
    }
}
