import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, Platform} from '@ionic/angular';
import {LoginService} from '../../../providers/services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [LoginService]
})
export class LoginPage implements OnInit {
    public isMobile: boolean;
    public email: string;
    public password: string;

    constructor(private route: Router,
                public plt: Platform,
                private navCtrl: NavController,
                private loginService: LoginService,
                private alertCtrl: AlertController,
                private loadingController: LoadingController
    ) { }

    ngOnInit() {

        this.isMobile = this.plt.is('ios') || this.plt.is('android');
    }

    public async login() {
        const loading = await this.loadingController.create({
            message: 'Validating user...'
        });
        await loading.present();
        this.loginService
            .login(this.email, this.password)
            .subscribe(() => {
                this.route.navigate(['/tabs/class']).catch(err => console.log(err));
                loading.dismiss();
            }, err => {
                loading.dismiss();
                console.log(err);
                this.alertCtrl.create({
                    header: 'Login failed ',
                    message: 'Email/Password invalid',
                    buttons: ['OK']
                }).then(alert => alert.present());
            });
    }
}
