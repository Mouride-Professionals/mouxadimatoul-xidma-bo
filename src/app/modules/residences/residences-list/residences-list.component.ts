import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence.service';
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
        private _sanitizer: DomSanitizer
    ) {}

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
