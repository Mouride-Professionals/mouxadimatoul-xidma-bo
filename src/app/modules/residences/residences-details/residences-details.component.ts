import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ResidencesPavillonAddComponent } from '../residences-pavillon-add/residences-pavillon-add.component';
import { ResidencesChambreFormComponent } from '../residences-chambre-form/residences-chambre-form.component';
import { ResidencesEditComponent } from '../residences-edit/residences-edit.component';
import { ResidencesEditImageComponent } from '../residences-edit-image/residences-edit-image.component';
import { Chambre } from '@core/model/chambre.model';
import { Pavillon } from '@core/model/pavillon.model';
import { ChambreService } from '@core/service/chambre/chambre.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-residences-details',
    templateUrl: './residences-details.component.html',
    styleUrls: ['./residences-details.component.scss'],
})
export class ResidencesDetailsComponent implements OnInit {
    data$: Observable<any>;
    residence: Residence;
    chambres: Chambre[] = [];
    pavillons: Pavillon[] = [];
    pavillonSelected: Pavillon;
    imageResidence: string | SafeUrl = 'assets/images/default.png';

    page: number = 0;
    size: number = 9;

    constructor(
        private _route: ActivatedRoute,
        private _residenceService: ResidenceService,
        private _chambreService: ChambreService,
        private _matDialog: MatDialog,
        private _sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            if (params.id) {
                const id = +params.id;
                this._residenceService
                    .getResidenceById(id)
                    .subscribe((res: Residence) => {
                        this.residence = res;
                        this.pavillons = res.pavillons;
                        this.pavillonSelected = res.pavillons[0];
                        this.loadChambres();
                        if (res.image) {
                            this.imageResidence =
                                this._sanitizer.bypassSecurityTrustUrl(
                                    `data:${res.image.type};base64,${res.image.fichier}`
                                );
                        }
                    });
            }
        });
    }

    onPageChange(event: PageEvent): void {
        this.page = event.pageIndex;
        this.size = event.pageSize;
        this.loadChambres();
    }

    loadChambres(): void {
        if (this.pavillonSelected) {
            this.data$ = this._chambreService.getChambreByPavillon(
                this.pavillonSelected.id,
                {
                    page: this.page,
                    size: this.size,
                }
            );
        }
    }

    onChangePavillon(p: Pavillon): void {
        this.pavillonSelected = p;
        this.page = 0;
        this.loadChambres();
    }

    onOpenPavillonModal(): void {
        this._matDialog
            .open(ResidencesPavillonAddComponent, {
                panelClass: ['w-full', 'max-w-120'],
                data: this.residence,
            })
            .afterClosed()
            .subscribe((pavillon: Pavillon) => {
                if (pavillon) {
                    this.pavillons.push(pavillon);
                    this.pavillonSelected = pavillon;
                    this.loadChambres();
                }
            });
    }

    onOpenChambreModal(chambre?: Chambre): void {
        this._matDialog
            .open(ResidencesChambreFormComponent, {
                panelClass: ['w-full', 'max-w-120'],
                data: {
                    chambre,
                    pavillons: this.pavillons,
                },
            })
            .afterClosed()
            .subscribe((reload: boolean) => {
                if (reload) {
                    this.loadChambres();
                }
            });
    }

    onOpenEditResidence(): void {
        this._matDialog
            .open(ResidencesEditComponent, {
                panelClass: ['w-full', 'max-w-120'],
                data: this.residence,
            })
            .afterClosed()
            .subscribe((res: Residence) => {
                if (res) {
                    this.residence = {
                        ...this.residence,
                        ...res,
                    };
                }
            });
    }

    onOpenResidenceImage(): void {
        this._matDialog.open(ResidencesEditImageComponent);
    }
}
