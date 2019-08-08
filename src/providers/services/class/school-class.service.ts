import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Class} from "../../../models/class";

@Injectable()
export class SchoolClassService {
    private url: string = environment.url;
    constructor(private http: HttpClient) { }

    public searchAll() {
        this.http.get<Class>(this.url + '/class').pipe(
            catchError(this.handleError<Class>('Error listing class search'))
        );
    }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
