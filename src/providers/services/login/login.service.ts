import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../../../models/login-response';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoginService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    public login(email: string, password: string) {
        return this.http.post<LoginResponse>(this.url + '/auth/login', { email, password })
            .pipe(map((user) => this.setUserLocalStorage(user)));
    }

    public logout() {
        localStorage.removeItem('user');
    }

    public isLogged(): boolean {
        return !!localStorage.getItem('user');
    }

    private setUserLocalStorage(user: LoginResponse) {
        if (user && user.accessToken) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
}
