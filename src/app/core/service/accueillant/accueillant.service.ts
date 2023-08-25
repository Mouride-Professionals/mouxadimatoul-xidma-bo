import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accueillant } from '@core/model/accueillant.model';
import { Pageable } from '@core/model/pageable.model';
import { RequestParams } from '@core/model/params.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/accueillants';

@Injectable({
    providedIn: 'root',
})
export class AccueillantService {
    constructor(private _httpClient: HttpClient) {}

    save(accueillant: Accueillant): Observable<Accueillant> {
        return this._httpClient.post<Accueillant>(API_URL, accueillant);
    }

    update(accueillant: Accueillant): Observable<Accueillant> {
        return this._httpClient.put<Accueillant>(API_URL, accueillant);
    }

    getById(id: number): Observable<Accueillant> {
        return this._httpClient.get<Accueillant>(`${API_URL}/${id}`);
    }

    getByUsername(username: string): Observable<Accueillant> {
        return this._httpClient.get<Accueillant>(`${API_URL}/user/${username}`);
    }

    getAll(params: RequestParams): Observable<Pageable<Accueillant>> {
        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                delete params[key];
            }
        });
        return this._httpClient.get<Pageable<Accueillant>>(API_URL, {
            params,
        });
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(`${API_URL}/${id}`);
    }
}
