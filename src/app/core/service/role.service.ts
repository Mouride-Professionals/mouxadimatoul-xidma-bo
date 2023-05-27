import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Role } from '@core/model/role.model';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl + '/roles';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private _http: HttpClient) {}
    // liste de tous les roles
    getAllRoles(): Observable<Role[]> {
        return this._http.get<Role[]>(API_URL).pipe(
            tap((roles) => console.log('Liste Role fetched!', roles)),
            catchError(this.handleError<Role[]>('list Role', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
