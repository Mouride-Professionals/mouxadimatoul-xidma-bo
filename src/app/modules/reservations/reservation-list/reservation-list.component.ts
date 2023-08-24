import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evenement } from '@core/model/evenement.model';
import { Pageable } from '@core/model/pageable.model';
import { Reservation } from '@core/model/reservation.model';
import { Residence } from '@core/model/residence.model';
import { EvenementService } from '@core/service/evenement/evenement.service';
import { ReservationService } from '@core/service/reservation/reservation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment, { Moment } from 'moment';
import { Observable } from 'rxjs';

const FORMAT_DATE = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.scss'],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: FORMAT_DATE,
        },
    ],
})
export class ReservationListComponent implements OnInit {
    data$: Observable<Pageable<Reservation>>;
    events$: Observable<Evenement[]>;
    residences$: Observable<Residence[]>;
    date: FormControl = new FormControl(moment(), Validators.required);
    residence: number;
    event: number;

    page = 0;
    pageSize = 10;
    presence: -1 | 1 = -1;

    constructor(
        private _evenementService: EvenementService,
        private _residenceService: ResidenceService,
        private _reservationService: ReservationService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.events$ = this._evenementService.getAllEvent();
        this.residences$ = this._residenceService.getAllResidences();
        this.loadReservations();
    }

    onPageChange(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadReservations();
    }

    onFilterData(): void {
        if (this.date.invalid) {
            return;
        }
        this.page = 0;
        this.loadReservations();
    }

    onExportation(): void {
        if (this.date.invalid || !this.residence || !this.event) {
            return;
        }
        this._reservationService
            .exportation(this.residence, {
                year: moment(this.date.value).toDate().getFullYear(),
                event: this.event,
                presence: this.presence,
            })
            .subscribe((responseMessage: any) => {
                const element = document.createElement('a');
                const file: Blob = new Blob([responseMessage], {
                    type: 'application/vnd.ms-excel',
                });
                element.href = URL.createObjectURL(file);
                document.body.appendChild(element);
                element.click();
                this._snackBar.open('Exportation réussie', '', {
                    panelClass: ['bg-green-500', 'text-white'],
                    duration: 2000,
                });
            });
    }

    onPresence(): void {
        this.presence = this.presence === -1 ? 1 : -1;
        this.page = 0;
        this.loadReservations();
    }

    loadReservations(): void {
        this.data$ = this._reservationService.getReservations({
            page: this.page,
            size: this.pageSize,
            year: moment(this.date.value).toDate().getFullYear(),
            event: this.event,
            residence: this.residence,
            presence: this.presence,
        });
    }

    selectYearHandler(normalizedyear: Moment, dp: any): void {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedyear.year());
        this.date.setValue(ctrlValue);
        dp.close();
    }

    onDelete(reservation: Reservation): void {
        this._fuseConfirmationService
            .open({
                message: `Voulez vous supprimer la reservation de ${reservation.invite.prenom} ${reservation.invite.nom}`,
                title: 'Confirmation',
                actions: {
                    confirm: {
                        label: 'Oui',
                        color: 'warn',
                    },
                    cancel: { label: 'Non' },
                },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this._reservationService
                        .delete(reservation.id)
                        .subscribe(() => {
                            this._snackBar.open(
                                'Réservation supprimée',
                                'fermer',
                                {
                                    panelClass: ['bg-red-500', 'text-white'],
                                    duration: 3000,
                                }
                            );
                            this.loadReservations();
                        });
                }
            });
    }
}
