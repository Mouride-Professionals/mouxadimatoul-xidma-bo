import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { translateApiError } from '@core/i18n/api-error-message';
import { Delegation } from '@core/model/delegation.model';
import { Invite } from '@core/model/invite.model';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-reservation-delegation-dialog',
    templateUrl: './reservation-delegation-dialog.component.html',
    styleUrls: ['./reservation-delegation-dialog.component.scss'],
})
export class ReservationDelegationDialogComponent {
    saving = false;

    delegationForm = new FormGroup({
        nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
        invites: new FormArray([this._createInviteForm(true)]),
    });

    constructor(
        private _dialogRef: MatDialogRef<ReservationDelegationDialogComponent>,
        private _delegationService: DelegationService,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService
    ) {}

    get invites(): FormArray {
        return this.delegationForm.get('invites') as FormArray;
    }

    onAddGuest(): void {
        this.invites.push(this._createInviteForm(false));
    }

    onRemoveGuest(index: number): void {
        if (index > 0) {
            this.invites.removeAt(index);
        }
    }

    onCancel(): void {
        this._dialogRef.close();
    }

    onSubmit(): void {
        if (this.delegationForm.invalid) {
            this.delegationForm.markAllAsTouched();
            return;
        }

        const inviteValues = this.invites.value as Invite[];
        const leader = {
            ...inviteValues[0],
            estResponsable: true,
        } as Invite;
        const guests = inviteValues.slice(1).map(
            (guest: Invite) =>
                ({
                    ...guest,
                    estResponsable: false,
                } as Invite)
        );
        const delegation = {
            nom: this.delegationForm.get('nom').value,
            nombre: inviteValues.length,
            chef: leader,
            invites: guests,
        } as Delegation;

        this.saving = true;
        this._delegationService.saveDelegation(delegation).subscribe({
            next: (savedDelegation: Delegation) => {
                this._snackBar.open(
                    this._translocoService.translate(
                        'delegations.messages.created',
                        { name: savedDelegation.nom }
                    ),
                    '',
                    {
                        panelClass: ['bg-green-600', 'text-white'],
                        duration: 3000,
                    }
                );
                this._dialogRef.close(savedDelegation);
            },
            error: (err) => {
                this.saving = false;
                this._snackBar.open(
                    translateApiError(this._translocoService, err),
                    '',
                    {
                        panelClass: ['bg-red-600', 'text-white'],
                        duration: 3500,
                    }
                );
            },
        });
    }

    private _createInviteForm(isLeader: boolean): FormGroup {
        return new FormGroup({
            prenom: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            nom: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            telephone: new FormControl('', [
                Validators.required,
                Validators.minLength(9),
            ]),
            adresse: new FormControl(''),
            email: new FormControl('', [Validators.email]),
            estResponsable: new FormControl(isLeader),
        });
    }
}
