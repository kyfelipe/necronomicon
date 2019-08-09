import {Component, OnInit} from '@angular/core';
import {Class} from "../../../models/class";
import {LoadingController} from "@ionic/angular";
import {SchoolClassService} from "../../../providers/services/class/school-class.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [SchoolClassService]
})
export class HomePage implements OnInit {
    public classes: Class[];
    constructor(private schoolClassService: SchoolClassService, private loadingCtrl: LoadingController) { }

    async ngOnInit() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading classes...'
        });

        /*loading.present();*/
        this.classes = [
            {
                titulo: 'Math'
            },
            {
                titulo: 'Science'
            }
        ];
        /*loading.dismiss();*/ //remover o loading
        /*this.schoolClassService.searchAll();*/
    }

    public searchClasses(): Class[] {
        return ;
    }
}
