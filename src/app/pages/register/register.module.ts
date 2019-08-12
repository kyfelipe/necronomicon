import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import {ToolbarModule} from '../../component/toolbar/toolbar.module';

const routes: Routes = [
    {
        path: '',
        component: RegisterPage
    },
    { path: 'add-student', loadChildren: '../add-student/add-student.module#AddStudentPageModule' }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ToolbarModule
    ],
    declarations: [RegisterPage]
})
export class RegisterPageModule {}
