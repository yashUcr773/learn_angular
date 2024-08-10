import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { AuthDirective } from '../directives/auth.directive';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [FormsModule, AuthDirective],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {
    email = signal('');
    password = signal('');
    private authService = inject(AuthService);

    onSubmit() {
        this.authService.authenticate(this.email(), this.password());
    }
}
