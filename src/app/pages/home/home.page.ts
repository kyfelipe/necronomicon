import {Component, OnInit} from '@angular/core';
import {Class} from '../../../models/class';
import {LoadingController} from '@ionic/angular';
import {SchoolClassService} from '../../../providers/services/class/school-class.service';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../providers/services/student/student.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    public classes: Class[];
    constructor(
        private loadingCtrl: LoadingController,
        private route: ActivatedRoute,
        private studentService: StudentService
    ) { }

    ngOnInit() {
/*        const loading = await this.loadingCtrl.create({
            message: 'Loading classes...'
        });
        loading.present();*/
        this.classes = [
            {
                titulo: 'Math'
            },
            {
                titulo: 'Science'
            },
            {
                titulo: 'Science'
            },
            {
                titulo: 'Science'
            },
            {
                titulo: 'Science'
            },
            {
                titulo: 'Science'
            },
            {
                titulo: 'Science'
            }
        ];
        this.search();
        /*loading.dismiss();*/ // remover o loading
    }

    public search() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.studentService.search(user.id).subscribe((res) => console.log(res));
    }
}
