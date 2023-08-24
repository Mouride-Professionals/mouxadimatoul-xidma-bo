import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { Observable } from 'rxjs';
import { AccueillantFormComponent } from '../accueillant-form/accueillant-form.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '@core/model/pageable.model';
import { Accueillant } from '@core/model/accueillant.model';

@Component({
    selector: 'app-accueillant-list',
    templateUrl: './accueillant-list.component.html',
    styleUrls: ['./accueillant-list.component.scss'],
})
export class AccueillantListComponent implements OnInit {
    data$: Observable<Pageable<Accueillant>>;

    page = 0;
    size = 10;
    residence: number;
    search = '';

    constructor(
        private _accService: AccueillantService,
        private _dialogService: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    onOpenModal(accueillant?: Accueillant): void {
        this._dialogService
            .open(AccueillantFormComponent, {
                panelClass: ['w-full', 'md:w-160'],
                data: accueillant,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.loadData();
                }
            });
    }

    onPageChange(event: PageEvent): void {
        this.page = event.pageIndex;
        this.size = event.pageSize;
        this.loadData();
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
