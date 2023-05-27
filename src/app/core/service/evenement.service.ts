import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from '@core/model/evenement.model';
import { Pagination } from '@core/model/pagination.model';
import { RequestParams } from '@core/model/params.model';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, catchError, of, tap } from 'rxjs';

const API_URL = environment.apiUrl + '/evenements';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private _event: ReplaySubject<Evenement> = new ReplaySubject<Evenement>(
    1
);

  constructor(private _http: HttpClient) { }

  // ajout Evenement
  createEvent(event: Evenement): Observable<Evenement> {
   console.log('Evenement form', event);
   return this._http
       .post<Evenement>(`${environment.apiUrl}/evenements`, event)
       .pipe(
           catchError(
               this.handleError<Evenement>('Ajout Evenement echoué')
           )
       );
  }
  
  updateEvent(event: Evenement): Observable<Evenement> {
      return this._http
          .put<Evenement>(`${environment.apiUrl}/evenements`, event)
          .pipe(
              catchError(
                  this.handleError<Evenement>('Modification Evenement echoué')
              )
          );
  }

  getEventById(id: number): Observable<Evenement> {
      return this._http.get<Evenement>(`${API_URL}/${id}`);
  }


  // liste de tous les Evenements
  getAllEvent(): Observable<Evenement[]> {
      return this._http.get<Evenement[]>(API_URL).pipe(
          tap((Events) => console.log('Liste Evenement fetched!', Events)),
          catchError(this.handleError<Evenement[]>('list Evenement'))
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
