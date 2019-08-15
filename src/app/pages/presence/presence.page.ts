import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {UserService} from '../../../providers/services/user/user.service';
import {Router} from '@angular/router';
import {NFC} from '@ionic-native/nfc/ngx';
import {PresenceService} from '../../../providers/services/presence/presence.service';
import {ConsoleService} from "../../../providers/services/console.service";

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
        private nfc: NFC,
        private consoleService: ConsoleService
    ) { }

    ngOnInit() {
        if (this.userService.isAdm()) {
            this.router.navigateByUrl('/tabs/class');
        }
    }

    public startNFC() {
        this.consoleService.console('Entrou na função: startNFC()');
        this.alertCtrl.create({
            header: 'Waiting for connection'
        }).then(a => a.present());

        this.nfc.addNdefListener(() => {
            this.consoleService.console('Ouvindo NFC');
            console.log('successfully attached ndef listener');
        }, (err) => {
            this.consoleService.console('Error ao iniciar o escutador do NFC');
            console.log('error attaching ndef listener', err);
        }).subscribe(async (event) => {
            this.consoleService.console(`Escutou, json: ${event}`);
            this.consoleService.console(`Escutou, bytes: ${event.tag.id}`);
            this.consoleService.console(`Escutou, bytesToString: ${this.nfc.bytesToString(event.tag.id)}`);
            this.consoleService.console(`Escutou, bytesToHexString: ${this.nfc.bytesToHexString(event.tag.id)}`);
            console.log('received ndef message. the tag contains: ', this.nfc.bytesToString(event.tag.id));
            this.save(this.nfc.bytesToString(event.tag.id));
        });
    }

    private async save(text: string) {
        this.consoleService.console(`Entrou na função savePresence() NFC`);
        const loading = await this.loadingController.create({
            message: 'Validating data...'
        });
        await loading.present();

        this.presenceService
            .save(this.userService.getId(), this.userService.getRegisterNumber(), text)
            .subscribe(() => {
                this.consoleService.console('Salvo presença com sucesso');
                loading.dismiss();
                this.alertCtrl.create({
                    header: 'Presence success',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }, (err: Error) => {
                this.consoleService.console(`Error ao salvar: ${err.message}`);
                loading.dismiss();
                this.alertCtrl.create({
                    header: 'Fail',
                    subHeader: 'Failed to save presence',
                    message: `${err.message}`
                }).then(alert => alert.present());
            });
    }
}
