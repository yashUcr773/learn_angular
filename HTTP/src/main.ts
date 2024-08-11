import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';


function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    console.log('Request:', request);
    const req = request.clone({
        // headers: request.headers.set('X-debug', 'true')
    });
    return next(req)
}


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([loggingInterceptor])
        )
    ]
}).catch((err) => console.error(err));
