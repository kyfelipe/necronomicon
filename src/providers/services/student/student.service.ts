import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Student} from '../../../models/student';
import {Registers} from '../../../models/registers';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    public search(id: number): Observable<Student> {
        return this.http.get<Student>(this.url + '/students/' + id);
    }

    public searchAll() {
        return this.http.get<Student[]>(this.url + '/students');
    }

    public searchStudentClasses(id: number) {
        return this.http.get<Registers>(this.url + '/registers/' + id);
    }

    public save(student: Student) {
        return this.http.post<Student>(this.url + '/students', student);
    }
}
