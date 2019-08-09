import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    { path: '', redirectTo: 'class', pathMatch: 'full' },
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'class', loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule)},
            { path: 'profile', loadChildren: './../profile/profile.module#ProfilePageModule' },
            { path: 'about', loadChildren: './about/about.module#AboutPageModule' }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {}
