import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

import {Student} from '../../../models/student';
import {StudentService} from '../../../providers/services/student/student.service';
import {Registers} from '../../../models/registers';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    public student: Student;
    public loading;
    public registers: Registers;

    constructor(
        private loadingCtrl: LoadingController,
        private studentService: StudentService
    ) { }

    async ngOnInit() {
        this.loading = await this.loadingCtrl.create({
            message: 'Loading classes...'
        });
        await this.loading.present();
        this.search();
    }

    public search() {
        const user = JSON.parse(localStorage.getItem('user'));

        this.searchProfile(user.id);
        this.searchRegisters(user.id);
    }

    public setColorLabel(situation: string): string {
        switch (situation) {
            case 'SAT':
                return 'success';
            case 'REG':
                return 'primary';
            case 'TOL':
                return 'secondary';
            case 'UNS':
                return 'warning';
            case 'SUS':
                return 'danger';
            default:
                return '';
        }
    }

    private searchProfile(userId) {
        this.studentService.search(userId).subscribe(data => {
            this.student = data;
            localStorage.setItem(
                'profile',
                JSON.stringify(
                    {
                        name: data.name,
                        registerNumber: data.studentNumber
                    })
            );
            this.loading.dismiss();
        });
    }

    private searchRegisters(userId) {
        this.studentService.searchStudentClasses(userId).subscribe((data: Registers) => {
            this.registers = data;
            this.loading.dismiss();
        });
    }
}
