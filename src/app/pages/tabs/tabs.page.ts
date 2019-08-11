import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../providers/services/user/user.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    providers: [UserService]
})
export class TabsPage implements OnInit {
    public isAdm: boolean;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.isAdm = this.userService.getAuthority() !== 'ROLE_STUDENT';
    }

}
