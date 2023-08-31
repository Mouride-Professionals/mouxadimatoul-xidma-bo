import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delegation } from '@core/model/delegation.model';
import { Pageable } from '@core/model/pageable.model';
import { RequestParams } from '@core/model/params.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/delegations';

@Injectable({
    providedIn: 'root',
})
export class DelegationService {
    constructor(private _httpClient: HttpClient) {}

    getAllDelagations(params: RequestParams): Observable<Pageable<Delegation>> {
        Object.entries(([key, value]) => {
            if (!value) {
                delete params[key];
            }
        });
        return this._httpClient.get<Pageable<Delegation>>(API_URL, {
            params,
        });
    }

    saveDelegation(delegation: Delegation): Observable<Delegation> {
        return this._httpClient.post<Delegation>(API_URL, delegation);
    }

    updateDelegation(delegation: Delegation): Observable<Delegation> {
        return this._httpClient.put<Delegation>(API_URL, delegation);
    }

    getById(id: number): Observable<Delegation> {
        return this._httpClient.get<Delegation>(`${API_URL}/${id}`);
    }
}
