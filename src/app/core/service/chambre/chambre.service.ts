import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Chambre } from '@core/model/chambre.model';
import { Pagination } from '@core/model/pagination.model';
import { RequestParams } from '@core/model/params.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/chambres';

@Injectable({
    providedIn: 'root',
})
export class ChambreService {
    private _httpClient: HttpClient = inject(HttpClient);

    createChambre(chambre: Chambre): Observable<Chambre> {
        return this._httpClient.post<Chambre>(API_URL, chambre);
    }

    updateChambre(chambre: Chambre): Observable<Chambre> {
        return this._httpClient.put<Chambre>(API_URL, chambre);
    }

    getChambreById(id: number): Observable<Chambre> {
        return this._httpClient.get<Chambre>(`${API_URL}/${id}`);
    }

    getAllDisponibleByResidence(
        residence: number,
        debut: Date,
        fin: Date
    ): Observable<Chambre[]> {
        return this._httpClient.get<Chambre[]>(
            `${API_URL}/residence/${residence}/disponible/${debut}/${fin}`
        );
    }

    getChambreByPavillon(
        idPavillon: number,
        params: RequestParams
    ): Observable<Pagination<Chambre>> {
        return this._httpClient.get<Pagination<Chambre>>(
            `${API_URL}/pavillon/${idPavillon}`,
            { params: { ...params } }
        );
    }
}
