import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pavillon } from '@core/model/pavillon.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/pavillons';

@Injectable({
    providedIn: 'root',
})
export class PavillonService {
    private _httpClient: HttpClient = inject(HttpClient);

    createPavillon(pavillon: Pavillon): Observable<Pavillon> {
        return this._httpClient.post<Pavillon>(API_URL, pavillon);
    }

    getPavillonsByResidence(idRes: number): Observable<Pavillon[]> {
        return this._httpClient.get<Pavillon[]>(
            `${API_URL}/residence/${idRes}`
        );
    }
}
