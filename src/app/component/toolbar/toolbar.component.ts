import {Component, Input} from '@angular/core';
import {LoginService} from "../../../providers/services/login/login.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [LoginService]
})
export class ToolbarComponent {
    @Input() title: string;

    constructor(private loginService: LoginService) { }

    public logout() {
        this.loginService.logout();
    }
}
