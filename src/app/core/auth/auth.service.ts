import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    Observable,
    of,
    ReplaySubject,
    switchMap,
} from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { AuthModel } from './auth.model';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
    private _authenticated: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    private _user: ReplaySubject<AuthModel> = new ReplaySubject<AuthModel>(1);

    constructor(private _httpClient: HttpClient) {}

    get auth$(): Observable<AuthModel> {
        return this._user.asObservable();
    }

    get isAuth$(): Observable<boolean> {
        return this._authenticated.asObservable();
    }

    get accessToken(): string {
        return localStorage.getItem('mkAccessToken') ?? '';
    }

    set accessToken(token: string) {
        localStorage.setItem('mkAccessToken', token);
    }

    set auth(value: AuthModel) {
        this._user.next(value);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    login(credentials: {
        username: string;
        password: string;
    }): Observable<AuthModel> {
        return this._httpClient
            .post(`${environment.apiUrl}/auth/login`, credentials)
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated.next(true);

                    // Store the user on the user service
                    const user = this._decodeTokenWithJWT(
                        this.accessToken
                    ) as AuthModel;
                    this.auth = user;

                    // Return a new observable with the response
                    return of(user);
                })
            );
    }

    getRoles(): string[] {
        const user: AuthModel = this._decodeTokenWithJWT(this.accessToken);
        return user.roles;
    }

    getUsername(): string {
        const user: AuthModel = this._decodeTokenWithJWT(this.accessToken);
        return user.sub;
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('mkAccessToken');

        // Set the authenticated flag to false
        this._authenticated.next(false);

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this.accessToken) {
            if (AuthUtils.isTokenExpired(this.accessToken)) {
                return of(false);
            }
            this._authenticated.next(true);
            const user = this._decodeTokenWithJWT(
                this.accessToken
            ) as AuthModel;
            this.auth = user;

            return of(true);
        }
        return of(false);
    }

    private _decodeTokenWithJWT(token: string): any {
        return jwtDecode(token);
    }
}
