import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';


function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    console.log('Request:', request);
    const req = request.clone({
        // headers: request.headers.set('X-debug', 'true')
    });
    return next(req).pipe(
        tap({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    console.log('Response:', event);
                }
            }
        })
    )
}


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([loggingInterceptor])
        )
    ]
}).catch((err) => console.error(err));
