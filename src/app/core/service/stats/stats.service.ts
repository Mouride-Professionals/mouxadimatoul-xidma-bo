import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TotalStats } from './total.stats';
import { ChambreDispo } from './chambre-dispo.stats';

const API_URL = environment.apiUrl + '/stats';

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor(private _httpClient: HttpClient) {}

    getTotalByResidence(residence: number): Observable<TotalStats> {
        return this._httpClient.get<TotalStats>(`${API_URL}/${residence}`);
    }

    getchambreDispoByResidence(residence: number): Observable<ChambreDispo[]> {
        return this._httpClient.get<ChambreDispo[]>(
            `${API_URL}/${residence}/chambres`
        );
    }
}
