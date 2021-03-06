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

    public login(studentNumber: string, password: string) {
        return this.http.post<LoginResponse>(this.url + '/auth/login', { studentNumber, password })
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
        /*console.log(user);*/
        if (user && user.accessToken) {
            if (this.pltUtil.isDesktop() || (this.pltUtil.isMobile() && user.perfis.length < 2)) {
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
