import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../providers/services/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    providers: [UserService]
})
export class ProfilePage implements OnInit {
    public isAdm: boolean;
    public profile: {
        name: string,
        registerNumber: string
    };

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.isAdm = this.userService.isAdm();
    }

}
