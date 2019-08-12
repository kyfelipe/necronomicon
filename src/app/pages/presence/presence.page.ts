import { Component, OnInit } from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {AlertController} from '@ionic/angular';
import {UserService} from "../../../providers/services/user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-presence',
    templateUrl: './presence.page.html',
    styleUrls: ['./presence.page.scss'],
    providers: [QRScanner, UserService]
})
export class PresencePage implements OnInit {

    constructor(
        private qrScanner: QRScanner,
        private alertCtrl: AlertController,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.userService.isAdm()) {
            this.router.navigateByUrl('/tabs/class');
        }
    }

    public scanner() {
        this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                // camera permission was granted
                // start scanning
                const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                    console.log('Scanned something', text);
                    this.alertCtrl.create({
                        header: 'Scanner',
                        message: `${text}`,
                        buttons: ['OK']
                    }).then(alert => alert.present());
                    this.qrScanner.hide(); // hide camera preview
                    scanSub.unsubscribe(); // stop scanning
                });
            } else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
            } else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
                this.alertCtrl.create({
                    header: 'Scanner denied',
                    message: 'You cannot attend without authorization',
                    buttons: ['OK']
                }).then(alert => alert.present());
                this.qrScanner.hide(); // hide camera preview
            }
        }).catch((e: any) => console.log('Error is', e));
    }

    public nfc() {

    }
}
