import {Injectable} from '@angular/core';

import {LoginResponse} from '../../../models/login-response';

@Injectable()
export class UserService {
    constructor() { }

    public getAuthority(): string {
        const user: LoginResponse = JSON.parse(localStorage.getItem('user'))
        return user.perfis[0].authority;
    }
}
