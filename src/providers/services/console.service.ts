import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ConsoleService {
    private url: string = environment.url;

    constructor(private http: HttpClient) { }

    console(text: string) {
        this.http.post(this.url + '/auth/test', text).pipe(
            catchError((e) => this.handleError<string>(e))
        );
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
