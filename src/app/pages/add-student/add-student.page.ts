import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/student';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.page.html',
    styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
    public name: string;
    public email: string;
    public studentNumber: string;
    public course: string;

    constructor() { }

    ngOnInit() { }

}
