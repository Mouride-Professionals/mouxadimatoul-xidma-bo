import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Accueillant } from '@core/model/accueillant.model';
import { Residence } from '@core/model/residence.model';
import { NavigationService } from '@core/navigation/navigation.service';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { ResidenceService } from '@core/service/residence/residence.service';
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
        private _residenceService: ResidenceService,
        private _accueillantService: AccueillantService,
        private _utilisateurService: UtilisateurService
    ) {
        if (_authService.getRoles().includes('ROLE_RESPONSABLE')) {
            this._residenceService
                .getResidenceByUsername(this._authService.getUsername())
                .subscribe((res: Residence) => {
                    this._residenceService.residence = res;
                });
        }
        if (_authService.getRoles().includes('ROLE_ACCUEILLANT')) {
            this._accueillantService
                .getByUsername(this._authService.getUsername())
                .subscribe((acc: Accueillant) => {
                    this._residenceService.residence = acc.residence;
                });
        }
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
