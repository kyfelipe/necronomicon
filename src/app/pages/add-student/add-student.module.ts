import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddStudentPage } from './add-student.page';
import {ToolbarModule} from '../../component/toolbar/toolbar.module';

const routes: Routes = [
    {
        path: '',
        component: AddStudentPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [AddStudentPage]
})
export class AddStudentPageModule {}
