import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delegation } from '@core/model/delegation.model';
import { Pagination } from '@core/model/pagination.model';
import { RequestParams } from '@core/model/params.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/delegations';

@Injectable({
    providedIn: 'root',
})
export class DelegationService {
    constructor(private _httpClient: HttpClient) {}

    getAllDelagations(
        params: RequestParams
    ): Observable<Pagination<Delegation>> {
        Object.entries(([key, value]) => {
            if (!value) {
                delete params[key];
            }
        });
        return this._httpClient.get<Pagination<Delegation>>(API_URL, {
            params,
        });
    }

    saveDelegation(delegation: Delegation): Observable<Delegation> {
        return this._httpClient.post<Delegation>(API_URL, delegation);
    }
}
