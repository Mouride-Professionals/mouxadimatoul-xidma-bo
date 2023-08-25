import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-residences-list',
    templateUrl: './residences-list.component.html',
    styleUrls: ['./residences-list.component.scss'],
})
export class ResidencesListComponent implements OnInit {
    residences$: Observable<Residence[]>;

    constructor(
        private _residenceService: ResidenceService,
        private _router: Router,
        private _authService: AuthService,
        private _sanitizer: DomSanitizer
    ) {
        if (
            !this._authService.getRoles().includes('ROLE_ADMIN') &&
            this._residenceService.residence
        ) {
            this._router.navigate([
                '/residences',
                this._residenceService.residence.id,
            ]);
        }
    }

    ngOnInit(): void {
        this.getResidences();
    }

    getImage(res: Residence): any {
        return res.image
            ? this._sanitizer.bypassSecurityTrustUrl(
                  `data:${res.image.type};base64,${res.image.fichier}`
              )
            : 'assets/images/default.png';
    }

    getResidences(): void {
        this.residences$ = this._residenceService.getAllResidences();
    }
}
