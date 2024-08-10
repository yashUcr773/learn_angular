import { Component } from '@angular/core';
import { SafeLinkDirective } from '../directives/safe-link.directive';
import { LoggerDirective } from '../directives/logger.directive';

@Component({
    selector: 'app-learning-resources',
    templateUrl: './learning-resources.component.html',
    styleUrl: './learning-resources.component.css',
    standalone: true,
    imports: [SafeLinkDirective, LoggerDirective]
})
export class LearningResourcesComponent { }
