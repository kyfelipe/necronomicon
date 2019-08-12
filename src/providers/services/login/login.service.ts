import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import {LoginResponse} from '../../../models/login-response';
import {environment} from '../../../environments/environment';
import {PlatformUtil} from '../../../app/helpers/utils/platform.util';
import {AlertController} from '@ionic/angular';

@Injectable()
export class LoginService {
    private url: string = environment.url;

    constructor(private http: HttpClient, private alertCtrl: AlertController, private pltUtil: PlatformUtil) { }

    public login(email: string, password: string) {
        return this.http.post<LoginResponse>(this.url + '/auth/login', { email, password })
            .pipe(map((user) => this.setUserLocalStorage(user)));
    }

    public logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
    }

    public isLogged(): boolean {
        return !!localStorage.getItem('user');
    }

    private setUserLocalStorage(user: LoginResponse) {
        if (user && user.accessToken) {
            if (this.pltUtil.isDesktop() || (user.perfis.length === 1)) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                this.alertCtrl.create({
                    header: 'Login failed',
                    message: 'Admin user cannot access via mobile platform',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }
        }
    }
}
