import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Student} from '../../../models/student';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    public search(id: number): Observable<Student> {
        return this.http.get<Student>(this.url + '/students/' + id);
    }
}
