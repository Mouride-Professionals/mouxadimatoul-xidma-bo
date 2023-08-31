import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Delegation } from '@core/model/delegation.model';
import { DelegationService } from '@core/service/delegation/delegation.service';

@Component({
    selector: 'app-delegation-edit',
    templateUrl: './delegation-edit.component.html',
    styleUrls: ['./delegation-edit.component.scss'],
})
export class DelegationEditComponent {
    delegationForm: FormGroup = new FormGroup({
        nom: new FormControl('', [Validators.required]),
        nombre: new FormControl(1, [
            Validators.required,
            Validators.min(1),
            Validators.max(50),
        ]),
    });

    constructor(
        private _matDialogRef: MatDialogRef<DelegationEditComponent>,
        private _delegationService: DelegationService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private delegation: Delegation
    ) {}

    get f(): any {
        return this.delegationForm.controls;
    }

    ngOnInit(): void {
        this.delegationForm.patchValue(this.delegation);
    }

    onSubmit(): void {
        if (this.delegationForm.invalid) {
            return;
        }
        this.delegationForm.disable();
        this.delegation = {
            ...this.delegation,
            ...this.delegationForm.value,
        };
        this._delegationService.updateDelegation(this.delegation).subscribe({
            next: () => {
                this._snackBar.open('Délégation modifiée avec success', '', {
                    panelClass: ['bg-green-500', 'text-white'],
                    duration: 3000,
                });
                this._matDialogRef.close(true);
            },
            error: (err: any) => {
                this.delegationForm.enable();
                console.error(err);
            },
        });
    }

    onClose(): void {
        this._matDialogRef.close();
    }
}
