import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

import {Student} from '../../../models/student';
import {StudentService} from '../../../providers/services/student/student.service';
import {Registers} from '../../../models/registers';

declare type Color = 'success' | 'primary' | 'secondary' | 'warning' | 'danger';

interface ColorSituation {
    situation: string;
    color: Color;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    public student: Student;
    public loading;
    public registers: Registers;
    private colors: ColorSituation[];

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

        this.colors = [
            {
                situation: 'SAT',
                color: 'success'
            },
            {
                situation: 'REG',
                color: 'primary'
            },
            {
                situation: 'TOL',
                color: 'secondary'
            },
            {
                situation: 'UNS',
                color: 'warning'
            },
            {
                situation: 'SUS',
                color: 'danger'
            }
        ];
    }

    public search() {
        const user = JSON.parse(localStorage.getItem('user'));

        this.searchProfile(user.id);
        this.searchRegisters(user.id);
    }

    public setColorLabel(situation: string): Color | void {
        return this.colors.forEach((color): Color => {
            if (color.situation === situation) {
                return color.color;
            }
        });
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
