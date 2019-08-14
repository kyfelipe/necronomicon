import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConsoleService} from "../console.service";

@Injectable()
export class PresenceService {
    private url: string;
    constructor(private http: HttpClient, private consoleService: ConsoleService) { }

    public save(studentId: number, studentNumber: string, classId: string) {
        this.consoleService.console(`Enviando dados`);
        const date = new Date();
        return this.http.post(this.url + '/registers', {studentId, studentNumber, classId, date});
    }
}
