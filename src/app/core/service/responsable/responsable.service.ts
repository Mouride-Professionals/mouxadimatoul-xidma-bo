import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '@core/model/pageable.model';
import { RequestParams } from '@core/model/params.model';
import { Responsable } from '@core/model/responsable.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/responsables';

@Injectable({
    providedIn: 'root',
})
export class ResponsableService {
    constructor(private _httpClient: HttpClient) {}

    save(responsable: Responsable): Observable<Responsable> {
        return this._httpClient.post<Responsable>(API_URL, responsable);
    }

    getById(id: number): Observable<Responsable> {
        return this._httpClient.get<Responsable>(`${API_URL}/${id}`);
    }

    getAll(params: RequestParams): Observable<Pageable<Responsable>> {
        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                delete params[key];
            }
        });
        return this._httpClient.get<Pageable<Responsable>>(API_URL, {
            params,
        });
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(`${API_URL}/${id}`);
    }
}
