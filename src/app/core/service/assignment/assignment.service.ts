import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '@core/model/assignment.model';
import { Pageable } from '@core/model/pageable.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/assignments';

@Injectable({
    providedIn: 'root',
})
export class AssignmentService {
    constructor(private _http: HttpClient) {}

    save(request: Partial<Assignment> & { agentId: number; residenceId: number }): Observable<Assignment> {
        return this._http.post<Assignment>(API_URL, request);
    }

    update(id: number, request: Partial<Assignment> & { agentId: number; residenceId: number }): Observable<Assignment> {
        return this._http.put<Assignment>(`${API_URL}/${id}`, request);
    }

    getById(id: number): Observable<Assignment> {
        return this._http.get<Assignment>(`${API_URL}/${id}`);
    }

    getAllByResidence(residenceId: number, page = 0, size = 20, search = ''): Observable<Pageable<Assignment>> {
        return this._http.get<Pageable<Assignment>>(API_URL, {
            params: { residenceId, page, size, search },
        });
    }

    getAllByAgent(agentId: number): Observable<Assignment[]> {
        return this._http.get<Assignment[]>(`${API_URL}/agent/${agentId}`);
    }

    delete(id: number): Observable<void> {
        return this._http.delete<void>(`${API_URL}/${id}`);
    }
}
