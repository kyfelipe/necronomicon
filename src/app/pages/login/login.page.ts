import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public isMobile: boolean;

    constructor(private route: Router, private plt: Platform) { }

    ngOnInit() {
        this.isMobile = this.plt.is('ios') || this.plt.is('android');
/*        console.log('IOS: ' + this.plt.is('ios'));
        console.log('Android: ' + this.plt.is('android'));
        console.log('Mobile: ' + this.plt.is('mobile'));
        console.log('Mobile Web: ' + this.plt.is('mobileweb'));
        console.log('Cordova: ' + this.plt.is('cordova'));*/
    }

    public login() {
        this.route.navigate(['']).catch(err => console.log(err));
    }

}
