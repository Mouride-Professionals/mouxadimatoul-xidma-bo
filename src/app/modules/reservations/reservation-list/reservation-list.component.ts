import fr from '@angular/common/locales/fr';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/auth/auth.service';
import { LanguageService } from '@core/i18n/language.service';
import { Evenement } from '@core/model/evenement.model';
import { Pageable } from '@core/model/pageable.model';
import { Reservation } from '@core/model/reservation.model';
import { Residence } from '@core/model/residence.model';
import { EvenementService } from '@core/service/evenement/evenement.service';
import { ReservationService } from '@core/service/reservation/reservation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';
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
    role: string;

    page = 0;
    pageSize = 10;
    presence: -1 | 1 = -1;

    constructor(
        private _authService: AuthService,
        private _evenementService: EvenementService,
        private _residenceService: ResidenceService,
        private _reservationService: ReservationService,
        private _languageService: LanguageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit(): void {
        this.role = this._authService.getRoles()[0];
        if (this._residenceService.residence) {
            this.residence = this._residenceService.residence.id;
        }
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
                locale: this._languageService.activeLanguage,
            })
            .subscribe((responseMessage: any) => {
                const element = document.createElement('a');
                const file: Blob = new Blob([responseMessage], {
                    type: 'application/vnd.ms-excel',
                });
                element.href = URL.createObjectURL(file);
                document.body.appendChild(element);
                element.click();
                this._snackBar.open(
                    this._translocoService.translate(
                        'reservations.messages.exported'
                    ),
                    '',
                    {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 2000,
                    }
                );
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
                message: this._translocoService.translate(
                    'reservations.confirmDelete',
                    {
                        firstName: reservation.invite.prenom,
                        lastName: reservation.invite.nom,
                    }
                ),
                title: this._translocoService.translate(
                    'common.confirmation'
                ),
                actions: {
                    confirm: {
                        label: this._translocoService.translate('common.yes'),
                        color: 'warn',
                    },
                    cancel: {
                        label: this._translocoService.translate('common.no'),
                    },
                },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this._reservationService
                        .delete(reservation.id)
                        .subscribe(() => {
                            this._snackBar.open(
                                this._translocoService.translate(
                                    'reservations.messages.deleted'
                                ),
                                this._translocoService.translate(
                                    'common.close'
                                ),
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
