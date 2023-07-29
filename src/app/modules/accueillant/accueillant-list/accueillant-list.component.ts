import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { Observable } from 'rxjs';
import { AccueillantFormComponent } from '../accueillant-form/accueillant-form.component';

@Component({
    selector: 'app-accueillant-list',
    templateUrl: './accueillant-list.component.html',
    styleUrls: ['./accueillant-list.component.scss'],
})
export class AccueillantListComponent implements OnInit {
    data$: Observable<any>;

    page = 0;
    size = 0;
    residence: number;
    search = '';
    constructor(
        private _accService: AccueillantService,
        private _dialogService: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    onOpenModal(): void {
        this._dialogService
            .open(AccueillantFormComponent, {
                panelClass: ['w-full', 'md:w-160'],
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.loadData();
                }
            });
    }

    loadData(): void {
        this.data$ = this._accService.getAll({
            page: this.page,
            size: this.size,
            residence: this.residence,
            search: this.search,
        });
    }
}
