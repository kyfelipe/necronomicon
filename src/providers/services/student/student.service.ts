import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Student} from '../../../models/student';
import {Observable} from 'rxjs';
import {StudentClasses} from "../../../models/student-classes";

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
        return this.http.get<StudentClasses[]>(this.url + '/schoolclasses/' + id);
    }

    public save(student: Student) {
        return this.http.post<Student>(this.url + '/students', student);
    }
}
