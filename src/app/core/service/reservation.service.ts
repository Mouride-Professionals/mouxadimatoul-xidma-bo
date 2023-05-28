import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '@core/model/pagination.model';
import { RequestParams } from '@core/model/params.model';
import { Reservation } from '@core/model/reservation.model';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, catchError, of, tap } from 'rxjs';

const API_URL = environment.apiUrl + '/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _reserve: ReplaySubject<Reservation> = new ReplaySubject<Reservation>(
    1
);

constructor(private _http: HttpClient) {}

get reserve$(): Observable<Reservation> {
    return this._reserve.asObservable();
}

set reserve(value: Reservation) {
    this._reserve.next(value);
}

// ajout Reservation
createreserve(reserve: Reservation): Observable<Reservation> {
    console.log('Reservation form', reserve);
    return this._http
        .post<Reservation>(`${environment.apiUrl}/reservations`, reserve)
        .pipe(
            catchError(
                this.handleError<Reservation>('Ajout réservation échoué')
            )
        );
}

updateReserve(reserve: Reservation): Observable<Reservation> {
    return this._http
        .put<Reservation>(`${environment.apiUrl}/reservations`, reserve)
        .pipe(
            catchError(
                this.handleError<Reservation>('Modification réservation échoué')
            )
        );
}

updateStatutReserve(id: number): Observable<Reservation> {
    return this._http
        .put<Reservation>(`${environment.apiUrl}/reservations/statut/${id}`, {})
        .pipe(
            catchError(
                this.handleError<Reservation>('Modification réservation échoué')
            )
        );
}

getreserveById(id: number): Observable<Reservation> {
    return this._http.get<Reservation>(`${API_URL}/${id}`);
}

getInfo(): Observable<Reservation> {
    return this._http
        .get<Reservation>(`${API_URL}/info`)
        .pipe(tap((reserve) => (this.reserve = reserve)));
}

// liste de tous les Reservations
getAllReserve(params: RequestParams): Observable<Pagination<Reservation>> {
    return this._http.get<Pagination<Reservation>>(API_URL).pipe(
        tap((reserves) => console.log('Liste réservation fetched!', reserves)),
        catchError(this.handleError<Pagination<Reservation>>('list Reservation', null))
    );
}
private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
}
}
