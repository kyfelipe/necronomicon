import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';

import {Student} from '../../../models/student';
import {StudentService} from '../../../providers/services/student/student.service';
import {SchoolClassService} from '../../../providers/services/class/school-class.service';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.page.html',
    styleUrls: ['./add-class.page.scss'],
    providers: [SchoolClassService]
})
export class AddClassPage implements OnInit {
    public title: string;
    public date: string;
    public time: string;
    public dayWeek: string;
    public numberOfPeriods: string;
    public students: number[];
    public students$: Observable<Student[]>;

    constructor(
        private alertController: AlertController,
        private classService: SchoolClassService,
        private router: Router,
        private studentService: StudentService
    ) { }

    ngOnInit() {
        this.students$ = this.studentService.searchAll();
    }

    public async save() {
        if (this.title && this.date && this.time && this.numberOfPeriods) {
            const date = this.getDate();
            const time = this.getTime();
            this.alertSuccessForm();
            this.classService
                .save({
                    student: this.students,
                    title: this.title,
                    classDates: [
                        {
                            numberOfPeriods: parseInt(this.numberOfPeriods),
                            dayOfMonth: parseInt(date[0]),
                            month: parseInt(date[1]),
                            hourBegin: parseInt(time[0]),
                            minuteBegin: parseInt(time[1])
                        }
                    ]
                }).subscribe(() => {
                    this.alertSuccessForm();
                });
        } else {
            await this.alertRequiredForm();
        }
    }

    public setDayWeek() {
        this.dayWeek = this.date;
    }

    private getDate() {
        const date = this.date.split('T', 1)[0].split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2];
        return [day, month, year];
    }

    private getTime() {
        const time = this.time.split('T')[1].split(':', 2);
        const hour = time[0];
        const minute = time[1];
        return [hour, minute];
    }

    private async alertRequiredForm() {
        const alert = await this.alertController.create({
            header: 'Form invalid',
            message: 'All fields must be filled',
            buttons: ['OK']
        });
        await alert.present();
    }

    private async alertSuccessForm() {
        const alert = await this.alertController.create({
            header: 'Registered',
            message: 'Class successfully saved. Redirecting in 3s...',
            keyboardClose: false
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
            this.router.navigate(['/tabs/register']);
        }, 3000);
    }
}
