import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PresenceService {
    private url: string;
    constructor(private http: HttpClient) { }

    public save(studentId: number, studentNumber: string, classId: number) {
        const date = new Date();
        return this.http.post(this.url + '/registers', {studentId, studentNumber, classId, date});
    }
}
