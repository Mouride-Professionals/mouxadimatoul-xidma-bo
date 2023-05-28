import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Residence} from '@core/model/residence.model';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrl + '/residences';


@Injectable({
  providedIn: 'root'
})
export class ResidenceService {

  constructor(private _http: HttpClient) { }

    // ajout résidence
    createResidence(res: any): Observable<Residence> {
        console.log(res);
      const formData = new FormData();
        formData.append('libelle', res.libelle);
        formData.append('description', res.description);
        formData.append('adresse', res.adresse);
        formData.append('telephoneResidence', res.telephoneResidence);
        formData.append('responsable', res.responsable);
        formData.append('image', JSON.stringify(res.image));
        return this._http
            .post<Residence>(`${environment.apiUrl}/residences`, formData)
            .pipe(
                catchError(
                    this.handleError<Residence>('Ajout Residence echoué')
                )
            );
    }
    getAllResidences(): Observable<Residence[]> {
        return this._http.get<Residence[]>(API_URL).pipe(
            tap(residences => console.log('Liste Residence fetched!', residences)),
            catchError(this.handleError<Residence[]>('list Residences', []))
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
