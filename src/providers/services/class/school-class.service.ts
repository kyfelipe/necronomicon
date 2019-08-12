import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable, of} from "rxjs";

import {Class} from "../../../models/class";
import {environment} from "../../../environments/environment";

@Injectable()
export class SchoolClassService {
    private url: string = environment.url;
    constructor(private http: HttpClient) { }

/*    public searchAll() {
        return this.http.get<Class>(this.url + '/class').pipe(
            catchError(this.handleError<Class>('Error listing class search'))
        );
    }*/

    public save(schoolClass: Class) {
        return this.http.post(this.url + '/schoolclasses', {schoolClass});
    }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
