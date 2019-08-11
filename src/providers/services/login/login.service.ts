import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import {LoginResponse} from '../../../models/login-response';
import {environment} from '../../../environments/environment';
import {PlatformUtil} from '../../../app/helpers/utils/platform.util';

@Injectable()
export class LoginService {
    private url: string = environment.url;

    constructor(private http: HttpClient, private pltUtil: PlatformUtil) { }

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
            if (user.perfis[0].authority === 'ROLE_STUDENT' && this.pltUtil.isMobile()
                || user.perfis[0].authority && this.pltUtil.isDesktop()) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }
    }
}
