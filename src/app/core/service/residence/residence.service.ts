import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from '@core/model/residence.model';
import { environment } from 'environments/environment';

const API_URL = environment.apiUrl + '/residences';

@Injectable({
    providedIn: 'root',
})
export class ResidenceService {
    constructor(private _http: HttpClient) {}

    // ajout résidence
    createResidence(res: any, image: any): Observable<Residence> {
        console.log(res);
        const formData = new FormData();
        formData.append('libelle', res.libelle);
        formData.append('description', res.description);
        formData.append('adresse', res.adresse);
        formData.append('telephoneResidence', res.telephoneResidence);
        formData.append('responsable', res.responsable);
        if (image) {
            formData.append('image', image);
        }
        return this._http.post<Residence>(API_URL, formData);
    }

    updateResidence(res: Residence): Observable<Residence> {
        return this._http.put<Residence>(API_URL, res);
    }

    getAllResidences(): Observable<Residence[]> {
        return this._http.get<Residence[]>(API_URL);
    }

    getResidenceById(id: number): Observable<Residence> {
        return this._http.get<Residence>(`${API_URL}/${id}`);
    }
}
