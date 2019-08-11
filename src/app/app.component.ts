import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LoginService} from '../providers/services/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [LoginService]
})
export class AppComponent {
    public isLogged: boolean;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService

    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.isLogged = this.loginService.isLogged();
        if (this.isLogged) {
            this.route.navigate(['/tabs/class']).catch(err => console.log(err));
        }
    }
}
