import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Delegation } from '@core/model/delegation.model';
import { Invite } from '@core/model/invite.model';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { DelegationAddInviteComponent } from './delegation-add-invite/delegation-add-invite.component';

@Component({
    selector: 'app-delegation-details',
    templateUrl: './delegation-details.component.html',
    styleUrls: ['./delegation-details.component.scss'],
})
export class DelegationDetailsComponent implements OnInit {
    delegation: Delegation;
    idDelegation: number;

    constructor(
        private _route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _delegationService: DelegationService
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.idDelegation = +params['id'];
                this.loadData();
            }
        });
    }

    openModal(invite?: Invite): void {
        this._matDialog
            .open(DelegationAddInviteComponent, {
                panelClass: ['w-full', 'md:w-160'],
                data: { delegation: this.delegation, invite },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.loadData();
                }
            });
    }

    loadData(): void {
        this._delegationService
            .getById(this.idDelegation)
            .subscribe((res: Delegation) => {
                this.delegation = res;
            });
    }
}
