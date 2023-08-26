import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invite } from '@core/model/invite.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl + '/invites';

@Injectable({
    providedIn: 'root',
})
export class InviteService {
    constructor(private _httpClient: HttpClient) {}

    save(invite: Invite): Observable<Invite> {
        return this._httpClient.post<Invite>(API_URL, invite);
    }
}
