import { Component, OnInit } from '@angular/core';
import { ResidenceService } from '@core/service/residence.service';
import { Observable } from 'rxjs';
import { Residence } from '@core/model/residence.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormResidenceComponent } from '@modules/residence/form-residence/form-residence.component';

@Component({
    selector: 'app-liste-residence',
    templateUrl: './liste-residence.component.html',
    styleUrls: ['./liste-residence.component.scss'],
})
export class ListeResidenceComponent implements OnInit {
    residences$: Observable<Residence[]>;
    constructor(
        private _residenceService: ResidenceService,
        private _sanitizer: DomSanitizer,
        private _matDialog: MatDialog
    ) {}
    getImage(res: Residence): any {
        return res.image
            ? this._sanitizer.bypassSecurityTrustUrl(
                  `data:${res.image.type};base64,${res.image.fichier}`
              )
            : 'assets/images/default.png';
    }
    ngOnInit(): void {
        this.getResidences();
    }

    getResidences(): void {
        this.residences$ = this._residenceService.getAllResidences();
    }

    addResidence(): void {
        this._matDialog
            .open(FormResidenceComponent, {
                autoFocus: false,
                panelClass: 'w-full',
                data: {
                    user: {},
                },
            })
            .afterClosed()
            .subscribe((reload) => {
                if (reload) {
                    this.getResidences();
                }
            });
    }
}
