import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '@core/model/utilisateur.model';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

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
        return this._http
            .post<Utilisateur>(API_URL, user)
            .pipe(
                catchError(
                    this.handleError<Utilisateur>('Ajout utilisateur echoué')
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
    getAllUsers(): Observable<Utilisateur[]> {
        return this._http.get<Utilisateur[]>(API_URL).pipe(
            tap((users) => console.log('Liste utilisateur fetched!', users)),
            catchError(this.handleError<Utilisateur[]>('list utilisateur', []))
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
