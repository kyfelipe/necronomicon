import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

import {Student} from '../../../models/student';
import {StudentService} from '../../../providers/services/student/student.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    public student: Student;

    constructor(
        private loadingCtrl: LoadingController,
        private studentService: StudentService
    ) { }

    ngOnInit() {
        this.search();
    }

    public async search() {

        const loading = await this.loadingCtrl.create({
            message: 'Loading classes...'
        });
        loading.present();
        const user = JSON.parse(localStorage.getItem('user'));
        this.studentService.search(user.id).subscribe(reg => {
            this.student = reg;
            localStorage.setItem(
                'profile',
                JSON.stringify(
                    {
                        name: reg.name,
                        registerNumber: reg.studentNumber
                    })
            );
            loading.dismiss();
        });
    }
}
