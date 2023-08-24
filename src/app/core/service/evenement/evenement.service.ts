import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from '@core/model/evenement.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/evenements';

@Injectable({
    providedIn: 'root',
})
export class EvenementService {
    constructor(private _http: HttpClient) {}

    // ajout Evenement
    createEvent(event: Evenement): Observable<Evenement> {
        console.log('Evenement form', event);
        return this._http.post<Evenement>(
            `${environment.apiUrl}/evenements`,
            event
        );
    }

    updateEvent(event: Evenement): Observable<Evenement> {
        console.log('Evenement form', event);
        return this._http.post<Evenement>(
            `${environment.apiUrl}/evenements`,
            event
        );
    }

    getEventById(id: number): Observable<Evenement> {
        return this._http.get<Evenement>(`${API_URL}/${id}`);
    }

    // liste de tous les Evenements
    getAllEvent(): Observable<Evenement[]> {
        return this._http.get<Evenement[]>(API_URL);
    }
}
