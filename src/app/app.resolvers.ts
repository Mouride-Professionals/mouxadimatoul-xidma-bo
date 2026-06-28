import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _navigationService: NavigationService,
        private _authService: AuthService,
        private _utilisateurService: UtilisateurService
    ) {
        // TODO Phase 2: load assignments for KHIDMA_AGENT and set active residence
        // KhidmaAgents may be assigned to multiple residences; access control
        // will be handled at screen level once the assignment module is complete.
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._navigationService.get(),
            this._utilisateurService.getInfo(),
        ]);
    }
}
