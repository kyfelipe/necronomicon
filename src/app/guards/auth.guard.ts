import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private alertController: AlertController) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user')) {
            return true;
        }

        this.router.navigate(['/login']);
        this.alertController.create({
            header: 'Sorry',
            message: 'Your authentication is invalid',
            buttons: ['OK']
        }).then(alert => alert.present());
        return false;
    }
}

