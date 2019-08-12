import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PresencePage } from './presence.page';
import {ToolbarModule} from "../../component/toolbar/toolbar.module";

const routes: Routes = [
    {
        path: '',
        component: PresencePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ToolbarModule
    ],
    declarations: [PresencePage]
})
export class PresencePageModule {}
