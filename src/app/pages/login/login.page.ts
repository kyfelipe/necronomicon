import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, Platform} from '@ionic/angular';
import {LoginService} from '../../../providers/services/login/login.service';
import {LoginResponse} from '../../../models/login-response';
import {PlatformUtil} from '../../helpers/utils/platform.util';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [LoginService]
})
export class LoginPage implements OnInit {
    public isDesktop: boolean;
    public email: string;
    public password: string;

    constructor(private route: Router,
                private pltUtil: PlatformUtil,
                public plt: Platform,
                private navCtrl: NavController,
                private loginService: LoginService,
                private alertCtrl: AlertController,
                private loadingController: LoadingController
    ) { }

    ngOnInit() {
        this.isDesktop = this.pltUtil.isDesktop();
    }

    public async login() {
        const loading = await this.loadingController.create({
            message: 'Validating user...'
        });
        await loading.present();
        this.loginService
            .login(this.email, this.password)
            .subscribe(() => {
                const user: LoginResponse = JSON.parse(localStorage.getItem('user'));
                loading.dismiss();

                if (this.isDesktop || (!this.isDesktop && user.perfis[0].authority === 'ROLE_STUDENT')) {
                    this.route.navigate(['/tabs/class']).catch(err => console.log(err));
                } else if (!this.isDesktop || user.perfis[0].authority !== 'ROLE_STUDENT') {
                    this.alertCtrl.create({
                        header: 'Login failed',
                        message: 'Admin user cannot access via mobile platform',
                        buttons: ['OK']
                    }).then(alert => alert.present());
                }
            }, err => {
                loading.dismiss();
                console.log(err);
                this.alertCtrl.create({
                    header: 'Login failed',
                    message: 'Email/Password invalid',
                    buttons: ['OK']
                }).then(alert => alert.present());
            });
    }
}
