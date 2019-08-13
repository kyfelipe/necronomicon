import {Component, OnInit} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../../providers/services/user/user.service';
import {Router} from '@angular/router';
import {NFC} from '@ionic-native/nfc/ngx';
import {PresenceService} from '../../../providers/services/presence/presence.service';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.page.html',
    styleUrls: ['./presence.page.scss'],
    providers: [QRScanner, UserService, NFC, PresenceService]
})
export class PresencePage implements OnInit {

    constructor(
        private qrScanner: QRScanner,
        private alertCtrl: AlertController,
        private userService: UserService,
        private router: Router,
        private loadingController: LoadingController,
        private presenceService: PresenceService,
        private nfc: NFC
    ) { }

    ngOnInit() {
        if (this.userService.isAdm()) {
            this.router.navigateByUrl('/tabs/class');
        }
    }

    public async startScanner() {
        await this.qrScanner.prepare().then((status: QRScannerStatus) => {
            if (status.authorized) {
                // camera permission was granted
                // start scanning
                this.qrScanner.show().then(() => {
                    const scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        console.log('Scanned something', text);
                        this.save(text);
                        this.qrScanner.hide().then(() => scanSub.unsubscribe()); // stop scanning // hide camera preview
                    });
                });

            } else if (status.denied) {
                if (confirm('Would you like to enable QR code scanning? You can allow camera access in your settings.')){
                    this.qrScanner.openSettings();
                }
            } else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
                this.alertCtrl.create({
                    header: 'Scanner denied',
                    message: 'You cannot attend without authorization',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }
        }).catch((e: any) => console.log('Error is', e));
    }

    public startNFC() {
        this.nfc.addNdefListener(() => {
            console.log('successfully attached ndef listener');
        }, (err) => {
            console.log('error attaching ndef listener', err);
        }).subscribe(async (event) => {
            console.log('received ndef message. the tag contains: ', this.nfc.bytesToHexString(event.tag.id));
            this.save(this.nfc.bytesToHexString(event.tag.id));
        });
    }

    private async save(text: string) {
        const loading = await this.loadingController.create({
            message: 'Validating data...'
        });
        await loading.present();

        this.presenceService
            .save(this.userService.getId(), this.userService.getRegisterNumber(), parseInt(text))
            .subscribe(() => {
                loading.dismiss();
                this.alertCtrl.create({
                    header: 'Presence success',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }, async () => {
                await loading.dismiss();
                const alert = await this.alertCtrl.create({
                    header: 'Fail',
                    message: 'Student successfully saved. Redirecting in 3s...'
                });
                await alert.present();
                setTimeout(() => {
                    alert.dismiss();
                    this.router.navigate(['/tabs/class']);
                }, 3000);
            });
    }
}
