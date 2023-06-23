import { Component, OnInit } from '@angular/core';
import { Pagination } from '@core/model/pagination.model';
import { Pavillon } from '@core/model/pavillon.model';
import { Reservation } from '@core/model/reservation.model';
import { Residence } from '@core/model/residence.model';
import { PavillonService } from '@core/service/pavillon/pavillon.service';
import { ReservationService } from '@core/service/reservation/reservation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import {
    addDays,
    addMonths,
    addWeeks,
    endOfMonth,
    endOfWeek,
    format,
    getDaysInMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns';

import fr from 'date-fns/locale/fr';
import { Observable, tap } from 'rxjs';

type CalendarReservationType = {
    id: number;
    libelleChambre: string;
    numeroChambre: string;
    reservations: {
        id: number;
        nom: string;
        prenom: string;
        telephone: string;
        start: string;
        end: string;
        statut: 'termine' | 'en_cours' | 'a_venir';
    }[];
};

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
    data$: Observable<Pagination<Reservation>>;

    page = 1;
    pageSize = 20;

    constructor(
        private _residenceService: ResidenceService,
        private _pavillonService: PavillonService,
        private _reservationService: ReservationService
    ) {}

    ngOnInit(): void {
        this.loadReservations();
    }

    loadReservations(): void {
        this.data$ = this._reservationService.getReservations({
            page: this.page - 1,
            size: this.pageSize,
        });
    }
}
