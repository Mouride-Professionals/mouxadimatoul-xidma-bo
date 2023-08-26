import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '@core/model/pageable.model';
import { Reservation } from '@core/model/reservation.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/reservations';

@Injectable({
    providedIn: 'root',
})
export class ReservationService {
    constructor(private _httpClient: HttpClient) {}

    addReservations(reservation: any): Observable<Reservation[]> {
        return this._httpClient.post<Reservation[]>(API_URL, reservation);
    }

    updateReservation(reservation: Reservation): Observable<Reservation> {
        return this._httpClient.put<Reservation>(API_URL, reservation);
    }

    getReservation(id: number): Observable<Reservation> {
        return this._httpClient.get<Reservation>(`${API_URL}/${id}`);
    }

    getReservations(params: {
        page: number;
        size: number;
        year: number;
        event: number;
        residence: number;
        presence: -1 | 1;
    }): Observable<Pageable<Reservation>> {
        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                delete params[key];
            } // remove invalid keys with undefined or null values
        });
        return this._httpClient.get<Pageable<Reservation>>(API_URL, {
            params: { ...params },
        });
    }

    exportation(
        residence: number,
        params: {
            year: number;
            event: number;
            presence: -1 | 1;
        }
    ): Observable<any> {
        return this._httpClient.get(
            `${API_URL}/exportation/residence/${residence}`,
            { responseType: 'arraybuffer' as 'json', params }
        );
    }

    getAllByPeriodAndPavillon(
        debut: Date,
        fin: Date,
        idPav: number
    ): Observable<Reservation[]> {
        return this._httpClient.get<Reservation[]>(
            `${API_URL}/pavillon/${idPav}/${debut}/${fin}`
        );
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(`${API_URL}/${id}`);
    }
}
