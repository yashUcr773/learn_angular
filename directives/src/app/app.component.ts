import { Component, computed, inject, signal } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { AuthDirective } from './directives/auth.directive';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { LoggerDirective } from './directives/logger.directive';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [AuthComponent, LearningResourcesComponent, AuthDirective, CommonModule, LoggerDirective],
})
export class AppComponent {

    private authService = inject(AuthService)
    isAdmin = computed(() => this.authService.activePermission() === 'admin')

}
