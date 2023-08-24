import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '@core/model/utilisateur.model';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { RequestParams } from '@core/model/params.model';
import { Pageable } from '@core/model/pageable.model';

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
        return this._http.post<Utilisateur>(
            `${environment.apiUrl}/utilisateurs`,
            user
        );
    }

    updateUser(user: Utilisateur): Observable<Utilisateur> {
        return this._http.put<Utilisateur>(
            `${environment.apiUrl}/utilisateurs`,
            user
        );
    }

    updateStatutUser(id: number): Observable<Utilisateur> {
        return this._http.put<Utilisateur>(
            `${environment.apiUrl}/utilisateurs/statut/${id}`,
            {}
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
    ): Observable<Pageable<Utilisateur>> {
        return this._http.get<Pageable<Utilisateur>>(API_URL, {
            params: { ...params, role },
        });
    }
}
