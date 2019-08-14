import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../providers/services/user/user.service';
import {PlatformUtil} from '../../helpers/utils/platform.util';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    providers: [UserService]
})
export class TabsPage implements OnInit {
    public isAdm: boolean;
    public isMobile: boolean;

    constructor(private userService: UserService, private pltUtil: PlatformUtil) { }

    ngOnInit() {
        this.isAdm = this.userService.isAdm();
        this.isMobile = this.pltUtil.isMobile();
    }

}
