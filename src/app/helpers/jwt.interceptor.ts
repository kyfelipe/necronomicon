import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
        }
        console.log(request);
        return next.handle(request);
    }
}
