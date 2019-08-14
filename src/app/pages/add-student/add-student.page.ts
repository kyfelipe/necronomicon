import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../providers/services/student/student.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.page.html',
    styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
    public name: string;
    public studentNumber: string;
    public course: string;

    constructor(private studentService: StudentService, private alertController: AlertController, private router: Router) { }

    ngOnInit() { }

    async save() {
        if (this.name && this.studentNumber && this.course) {
            this.alertSuccessForm();
            this.studentService
                .save({name: this.name, studentNumber: this.studentNumber, course: this.course})
                .subscribe(() => {
                    this.alertSuccessForm();
                });
        } else {
            await this.alertRequiredForm();
        }

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
            message: 'Student successfully saved. Redirecting in 3s...',
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
            this.router.navigate(['/tabs/register']);
        }, 3000);
    }
}
