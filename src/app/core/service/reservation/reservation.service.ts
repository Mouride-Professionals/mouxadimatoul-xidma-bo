import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '@core/model/reservation.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/reservations';

@Injectable({
    providedIn: 'root',
})
export class ReservationService {
    constructor(private _httpClient: HttpClient) {}

    // ajout Reservation
    addReservations(reservation: any): Observable<Reservation[]> {
        return this._httpClient.post<Reservation[]>(API_URL, reservation);
    }
}
