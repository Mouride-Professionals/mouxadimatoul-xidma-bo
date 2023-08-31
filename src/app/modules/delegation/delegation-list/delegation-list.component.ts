import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Delegation } from '@core/model/delegation.model';
import { Pageable } from '@core/model/pageable.model';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { Observable } from 'rxjs';
import { DelegationEditComponent } from '../delegation-edit/delegation-edit.component';

@Component({
    selector: 'app-delegation-list',
    templateUrl: './delegation-list.component.html',
    styleUrls: ['./delegation-list.component.scss'],
})
export class DelegationListComponent implements OnInit {
    data$: Observable<Pageable<Delegation>>;

    page: number = 0;
    size: number = 20;

    constructor(
        private _delegationService: DelegationService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    onEditDelegation(delegation: Delegation): void {
        this._matDialog
            .open(DelegationEditComponent, {
                panelClass: ['w-full'],
                autoFocus: false,
                data: delegation,
            })
            .afterClosed()
            .subscribe((res: any) => {
                if (res) {
                    this.loadData();
                }
            });
    }

    loadData(): void {
        this.data$ = this._delegationService.getAllDelagations({
            page: this.page,
            size: this.size,
        });
    }
}
