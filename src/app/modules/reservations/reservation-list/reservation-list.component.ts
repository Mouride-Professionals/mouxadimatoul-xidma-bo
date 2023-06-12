import { Component, OnInit } from '@angular/core';
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
    residences$: Observable<Residence[]>;
    pavillons$: Observable<Pavillon[]>;

    residenceSelected: Residence;
    pavillonSelected: Pavillon;

    type: 'week' | 'month' = 'week';

    today: Date = new Date();
    current: Date;
    startDate: Date;
    endDate: Date;

    arraDays: string[] = [];

    calendarReservations: CalendarReservationType[] = [];

    constructor(
        private _residenceService: ResidenceService,
        private _pavillonService: PavillonService,
        private _reservationService: ReservationService
    ) {}

    ngOnInit(): void {
        this.residences$ = this._residenceService.getAllResidences().pipe(
            tap((residences: Residence[]) => {
                if (residences.length > 0) {
                    this.residenceSelected = residences[0];
                    this.pavillons$ = this._pavillonService
                        .getPavillonsByResidence(this.residenceSelected.id)
                        .pipe(
                            tap((pavillons: Pavillon[]) => {
                                if (pavillons.length > 0) {
                                    this.pavillonSelected = pavillons[0];
                                    this.loadReservations();
                                }
                            })
                        );
                }
            })
        );
        this.current = this.today;
        this.startDate = startOfWeek(this.today, { weekStartsOn: 1 });
        this.endDate = addDays(this.startDate, 6);
        this.getPeriod();
    }

    getPeriod(): void {
        const numberOfDays: number =
            this.type === 'week' ? 7 : getDaysInMonth(this.current);
        this.arraDays = Array.from(Array(numberOfDays)).map((e, i) =>
            format(addDays(this.startDate, i), 'eeee dd', { locale: fr })
        );
    }

    loadReservations(): void {
        this._reservationService
            .getAllByPeriodAndPavillon(
                this.startDate,
                this.endDate,
                this.pavillonSelected?.id
            )
            .subscribe((res: Reservation[]) => {
                const result: { [key: number]: CalendarReservationType } =
                    res.reduce(
                        (event: CalendarReservationType, curr: Reservation) => (
                            event[curr.chambre.numero]
                                ? {
                                      ...event[curr.chambre.numero],
                                      reservations: [
                                          ...event[curr.chambre.numero]
                                              .reservations,
                                          {
                                              id: curr.id,
                                              prenom: curr.invite.prenom,
                                              nom: curr.invite.nom,
                                              telephone: curr.invite.telephone,
                                              start: this.getStart(
                                                  new Date(curr.dateEntree)
                                              ),
                                              end: this.getEnd(
                                                  new Date(curr.dateSortie)
                                              ),
                                              statut: this.getStatut(
                                                  new Date(curr.dateEntree),
                                                  new Date(curr.dateSortie)
                                              ),
                                          },
                                      ],
                                  }
                                : (event[curr.chambre.numero] = {
                                      id: curr.chambre.id,
                                      libelleChambre: `Chambre ${curr.chambre.numero}`,
                                      nombrePlace: curr.chambre.nombrePlace,
                                      reservations: [
                                          {
                                              id: curr.id,
                                              prenom: curr.invite.prenom,
                                              nom: curr.invite.nom,
                                              telephone: curr.invite.telephone,
                                              start: this.getStart(
                                                  new Date(curr.dateEntree)
                                              ),
                                              end: this.getEnd(
                                                  new Date(curr.dateSortie)
                                              ),
                                              statut: this.getStatut(
                                                  new Date(curr.dateEntree),
                                                  new Date(curr.dateSortie)
                                              ),
                                          },
                                      ],
                                  }),
                            event
                        ),
                        {} as CalendarReservationType
                    );
                this.calendarReservations = Object.values(result);
                console.log(this.calendarReservations);
            });
    }

    getStart(date: Date): number {
        if (date.getDate() <= this.startDate.getDate()) {
            return 1;
        }
        return date.getDay() === 0 ? 7 : date.getDay();
    }

    getEnd(date: Date): number {
        if (date.getDate() >= this.endDate.getDate()) {
            return 8;
        }
        return date.getDay() === 0 ? 8 : date.getDay() + 1;
    }

    getStatut(start: Date, end: Date): 'termine' | 'en_cours' | 'a_venir' {
        if (this.today.getDate() < start.getDate()) {
            return 'a_venir';
        } else if (this.today.getDate() > end.getDate()) {
            return 'termine';
        } else {
            return 'en_cours';
        }
    }

    // getDayStartWeekMonday(x: number): number {
    //     return x === 6
    //         ? 1
    //         : x === 2
    //         ? 2
    //         : x === 4
    //         ? 3
    //         : x === 0
    //         ? 4
    //         : x === 3
    //         ? 5
    //         : x === 5
    //         ? 6
    //         : 7;
    // }

    onNext(): void {
        this.startDate =
            this.type === 'week'
                ? addWeeks(this.startDate, 1)
                : addMonths(this.startDate, 1);
        this.endDate =
            this.type === 'week'
                ? addDays(endOfWeek(this.startDate), 1)
                : endOfMonth(this.startDate);
        this.getPeriod();
    }

    onPrev(): void {
        this.startDate =
            this.type === 'week'
                ? subWeeks(this.startDate, 1)
                : subMonths(this.startDate, 1);
        this.endDate =
            this.type === 'week'
                ? addDays(endOfWeek(this.startDate), 1)
                : endOfMonth(this.startDate);
        this.getPeriod();
    }
}
