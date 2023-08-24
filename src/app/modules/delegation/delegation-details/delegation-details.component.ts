import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Delegation } from '@core/model/delegation.model';
import { DelegationService } from '@core/service/delegation/delegation.service';

@Component({
    selector: 'app-delegation-details',
    templateUrl: './delegation-details.component.html',
    styleUrls: ['./delegation-details.component.scss'],
})
export class DelegationDetailsComponent implements OnInit {
    delegation: Delegation;

    constructor(
        private _route: ActivatedRoute,
        private _delegationService: DelegationService
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            const idDelegation = +params['id'];
            if (idDelegation) {
                this._delegationService
                    .getById(idDelegation)
                    .subscribe((res: Delegation) => {
                        this.delegation = res;
                    });
            }
        });
    }
}
