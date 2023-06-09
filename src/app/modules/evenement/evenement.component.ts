import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormEvenementComponent } from './form-evenement/form-evenement.component';
import { Evenement } from '@core/model/evenement.model';
import { EvenementService } from '@core/service/evenement/evenement.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-evenement',
    templateUrl: './evenement.component.html',
    styleUrls: ['./evenement.component.scss'],
})
export class EvenementComponent implements OnInit {
    search: string = '';
    events$: Observable<Evenement[]>;
    constructor(
        private _matDialog: MatDialog,
        private _eventService: EvenementService
    ) {}

    ngOnInit(): void {
        this.getAllEvents();
    }

    onSearch(): void {}

    addNewEvent(event?: Evenement): void {
        this._matDialog
            .open(FormEvenementComponent, {
                autoFocus: false,
                panelClass: ['w-full', 'max-w-120'],
                data: event,
            })
            .afterClosed()
            .subscribe((reload: boolean) => {
                if (reload) {
                    this.getAllEvents();
                }
            });
    }

    getAllEvents(): void {
        this.events$ = this._eventService.getAllEvent();
    }
}
