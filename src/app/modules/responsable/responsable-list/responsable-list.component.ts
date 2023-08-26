import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from '@core/model/pageable.model';
import { Responsable } from '@core/model/responsable.model';
import { ResponsableService } from '@core/service/responsable/responsable.service';
import { Observable } from 'rxjs';
import { ResponsableFormComponent } from '../responsable-form/responsable-form.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-responsable-list',
    templateUrl: './responsable-list.component.html',
    styleUrls: ['./responsable-list.component.scss'],
})
export class ResponsableListComponent implements OnInit {
    data$: Observable<Pageable<Responsable>>;

    page = 0;
    size = 10;
    residence: number;
    search = '';

    constructor(
        private _responsableService: ResponsableService,
        private _dialogService: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    onOpenModal(responsable?: Responsable): void {
        this._dialogService
            .open(ResponsableFormComponent, {
                panelClass: ['w-full', 'md:w-160'],
                data: responsable,
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
        this.data$ = this._responsableService.getAll({
            page: this.page,
            size: this.size,
            residence: this.residence,
            search: this.search,
        });
    }
}
