import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input('user') user: { id: string; name: string; avatar: string } | null =
    null;

  randomNumber = signal({ id: Math.random(), val: Math.random() });

  randomComputedValue = computed(() => {
    return this.randomNumber().val;
  });

  get userAvatar() {
    // console.log('getter called');
    return 'users/' + this.user?.avatar || '';
  }

  //   getUserAvatar() {
  //     console.log('getUserAvatar called');
  //     return 'users/' + this.user?.avatar || '';
  //   }

  onSelectUser() {
    this.randomNumber.set({ id: Math.random(), val: Math.random() });
  }
}
