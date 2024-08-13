import { Component, computed, DestroyRef, inject, Injectable, input, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanMatch, CanMatchFn, RedirectCommand, ResolveFn, Route, Router, RouterLink, RouterOutlet, RouterStateSnapshot, UrlSegment } from '@angular/router';

@Component({
    selector: 'app-user-tasks',
    standalone: true,
    templateUrl: './user-tasks.component.html',
    styleUrl: './user-tasks.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {

    userName = input.required<string>()

    // static data sent from app.routes.ts
    message = input.required<string>()

}

export const resolveUsername: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    const userId = activatedRoute.paramMap.get('userId')
    const usersService = inject(UsersService)
    return usersService.users.find(user => user.id === userId)?.name || ""
}

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    return resolveUsername(activatedRoute, routerState) + "'s Tasks"
}

export const dummyCanMatchGuard: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    return Math.random() < 0.9 ? true : new RedirectCommand(router.parseUrl('/unauthorized'))
}

@Injectable({ providedIn: 'root' })
export class dummyCanMatchGuardClass implements CanMatch {
    constructor(private router: Router) { }
    canMatch(route: Route, segments: UrlSegment[]) {
        return Math.random() < 0.9 ? true : new RedirectCommand(this.router.parseUrl('/unauthorized'))
    }
}