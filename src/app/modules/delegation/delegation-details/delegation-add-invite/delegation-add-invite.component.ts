import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Delegation } from '@core/model/delegation.model';
import { Invite } from '@core/model/invite.model';
import { InviteService } from '@core/service/invite/invite.service';

@Component({
    selector: 'app-delegation-add-invite',
    templateUrl: './delegation-add-invite.component.html',
    styleUrls: ['./delegation-add-invite.component.scss'],
})
export class DelegationAddInviteComponent implements OnInit {
    inviteForm: FormGroup = new FormGroup({
        prenom: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
        ]),
        nom: new FormControl(null, [
            Validators.required,
            Validators.minLength(2),
        ]),
        telephone: new FormControl(null, [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(15),
        ]),
        adresse: new FormControl(null),
        email: new FormControl(null, [Validators.email]),
    });
    isEdit = false;
    titleKey = 'delegations.members.addTitle';

    constructor(
        private _matDialogRef: MatDialogRef<DelegationAddInviteComponent>,
        private _inviteService: InviteService,
        @Inject(MAT_DIALOG_DATA)
        private _data: { delegation: Delegation; invite?: Invite }
    ) {}

    ngOnInit(): void {
        if (this._data.invite) {
            this.isEdit = true;
            this.titleKey = 'delegations.members.editTitle';
            this.inviteForm.patchValue(this._data.invite);
        }
    }

    onSubmit(): void {
        if (this.inviteForm.invalid) {
            return;
        }
        const invite: Invite = {
            ...this._data.invite,
            ...this.inviteForm.value,
            delegation: this._data.delegation,
        };
        this._inviteService.save(invite).subscribe(() => {
            this._matDialogRef.close(true);
        });
    }
}
