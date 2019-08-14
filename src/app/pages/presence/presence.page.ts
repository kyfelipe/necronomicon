import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../../providers/services/user/user.service';
import {Router} from '@angular/router';
import {NFC} from '@ionic-native/nfc/ngx';
import {PresenceService} from '../../../providers/services/presence/presence.service';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.page.html',
    styleUrls: ['./presence.page.scss'],
    providers: [UserService, NFC, PresenceService]
})
export class PresencePage implements OnInit {

    constructor(
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

    public startNFC() {
        this.alertCtrl.create({
            header: 'Waiting for connection',
            message: '<ion-icon name="wifi" size="large"></ion-icon>'
        }).then(a => a.present());

        this.nfc.addNdefListener(() => {
            console.log('successfully attached ndef listener');
        }, (err) => {
            console.log('error attaching ndef listener', err);
        }).subscribe(async (event) => {
            console.log('received ndef message. the tag contains: ', this.nfc.bytesToString(event.tag.id));
            this.save(this.nfc.bytesToString(event.tag.id));
        });
    }

    private async save(text: string) {
        const loading = await this.loadingController.create({
            message: 'Validating data...'
        });
        await loading.present();

        this.presenceService
            .save(this.userService.getId(), this.userService.getRegisterNumber(), text)
            .subscribe(() => {
                loading.dismiss();
                this.alertCtrl.create({
                    header: 'Presence success',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }, async (err: Error) => {
                await loading.dismiss();
                const alert = await this.alertCtrl.create({
                    header: 'Fail',
                    subHeader: 'Failed to save presence',
                    message: `${err.message}`
                });
                await alert.present();
            });
    }
}
