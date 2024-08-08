import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = input.required<{ avatar: string; id: string; name: string }>();

  get userAvatar() {
    return 'users/' + this.user().avatar;
  }

  onSelectUser() {}
}
