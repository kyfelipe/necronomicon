import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    public profile: {
        name: string,
        registerNumber: string
    };

    constructor() { }

    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

}
