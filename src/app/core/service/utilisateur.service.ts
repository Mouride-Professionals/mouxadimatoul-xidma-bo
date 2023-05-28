import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '@core/model/utilisateur.model';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { RequestParams } from '@core/model/params.model';
import { Pagination } from '@core/model/pagination.model';

const API_URL = environment.apiUrl + '/utilisateurs';

@Injectable({
    providedIn: 'root',
})
export class UtilisateurService {
    private _user: ReplaySubject<Utilisateur> = new ReplaySubject<Utilisateur>(
        1
    );

    constructor(private _http: HttpClient) {}

    get user$(): Observable<Utilisateur> {
        return this._user.asObservable();
    }

    set user(value: Utilisateur) {
        this._user.next(value);
    }

    // ajout utilisateur
    createUser(user: Utilisateur): Observable<Utilisateur> {
        console.log('utilisateur form', user);
        return this._http
            .post<Utilisateur>(`${environment.apiUrl}/utilisateurs`, user)
            .pipe(
                catchError(
                    this.handleError<Utilisateur>('Ajout utilisateur echoué')
                )
            );
    }
    updateUser(user: Utilisateur): Observable<Utilisateur> {
        return this._http
            .put<Utilisateur>(`${environment.apiUrl}/utilisateurs`, user)
            .pipe(
                catchError(
                    this.handleError<Utilisateur>(
                        'Modification utilisateur echoué'
                    )
                )
            );
    }
    updateStatutUser(id: number): Observable<Utilisateur> {
        return this._http
            .put<Utilisateur>(
                `${environment.apiUrl}/utilisateurs/statut/${id}`,
                {}
            )
            .pipe(
                catchError(
                    this.handleError<Utilisateur>(
                        'Modification utilisateur echoué'
                    )
                )
            );
    }

    getUserById(id: number): Observable<Utilisateur> {
        return this._http.get<Utilisateur>(`${API_URL}/${id}`);
    }

    getInfo(): Observable<Utilisateur> {
        return this._http
            .get<Utilisateur>(`${API_URL}/info`)
            .pipe(tap((user) => (this.user = user)));
    }

    // liste de tous les utilisateurs
    getAllUsers(
        params: RequestParams,
        role: string
    ): Observable<Pagination<Utilisateur>> {
        return this._http
            .get<Pagination<Utilisateur>>(API_URL, {
                params: { ...params, role },
            })
            .pipe(
                tap((users) =>
                    console.log('Liste utilisateur fetched!', users)
                ),
                catchError(
                    this.handleError<Pagination<Utilisateur>>(
                        'list utilisateur',
                        null
                    )
                )
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
