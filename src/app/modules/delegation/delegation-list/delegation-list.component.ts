import { Component, OnInit } from '@angular/core';
import { Delegation } from '@core/model/delegation.model';
import { Pagination } from '@core/model/pagination.model';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-delegation-list',
    templateUrl: './delegation-list.component.html',
    styleUrls: ['./delegation-list.component.scss'],
})
export class DelegationListComponent implements OnInit {
    data$: Observable<Pagination<Delegation>>;

    page: number = 0;
    size: number = 20;

    constructor(private _delegationService: DelegationService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.data$ = this._delegationService.getAllDelagations({
            page: this.page,
            size: this.size,
        });
    }
}
