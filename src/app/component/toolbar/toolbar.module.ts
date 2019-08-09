import {NgModule} from '@angular/core';
import {ToolbarComponent} from './toolbar.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [ToolbarComponent]
})
export class ToolbarModule { }
