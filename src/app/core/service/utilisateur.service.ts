import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utilisateur} from '@core/model/utilisateur.model';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private _http: HttpClient) { }
    // ajout utilisateur
    createUser(user: Utilisateur): Observable<Utilisateur> {
        return this._http
            .post<Utilisateur>(`${environment.urlApp}/utilisateur/add`, user)
            .pipe(catchError(this.handleError<Utilisateur>('Ajout utilisateur echouée')));
    }
    // liste de tous les utilisateurs
    getAllUsers(): Observable<Utilisateur[]> {
        return this._http.get<Utilisateur[]>(`${environment.urlApp}/utilisateur/list`).pipe(
            tap(user => console.log('Liste utilisateur fetched!', user)),
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
