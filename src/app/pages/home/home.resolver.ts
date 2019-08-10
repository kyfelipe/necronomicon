import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Student} from '../../../models/student';
import {StudentService} from '../../../providers/services/student/student.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<Student> {

    constructor(private studentService: StudentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> {
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            return this.studentService.search(user.id);
        }, 100);
        return;
    }
}
