import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
    private url: string = environment.url;

    constructor(private http: HttpClient, private router: Router) { }

    public login(email: string, password: string) {
        return this.http.post<any>(this.url + '/auth/login', { email, password }).pipe(
            catchError(this.handleError<any>('Error logging in'))
        );
    }

    public logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
