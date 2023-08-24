import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Delegation } from '@core/model/delegation.model';
import { DelegationService } from '@core/service/delegation/delegation.service';

@Component({
    selector: 'app-delegation-form',
    templateUrl: './delegation-form.component.html',
    styleUrls: ['./delegation-form.component.scss'],
})
export class DelegationFormComponent implements OnInit {
    delegationForm: FormGroup = new FormGroup({
        nom: new FormControl('', [Validators.required]),
        nombre: new FormControl(1, [
            Validators.required,
            Validators.min(1),
            Validators.max(10),
        ]),
        invites: new FormArray([], Validators.required),
    });
    delegation: Delegation;

    constructor(
        private _delegationService: DelegationService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    get invites(): FormArray {
        return this.delegationForm.get('invites') as FormArray;
    }

    ngOnInit(): void {
        this._addGuest();
    }

    onSubmit(): void {
        if (this.delegationForm.invalid) {
            return;
        }
        this.delegation = {
            ...this.delegation,
            ...this.delegationForm.value,
            chef: {
                ...this.delegationForm.value.invites[0],
                estResponsable: true,
            },
            invites: this.delegationForm.value.invites.slice(1),
        };
        this._delegationService.saveDelegation(this.delegation).subscribe({
            next: (res: Delegation) => {
                this._snackBar.open(
                    `La délégation ${res.nom} est bien ajoutée`,
                    '',
                    {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 2500,
                    }
                );
                this._router.navigate(['/delegations']);
            },
            error: (err) => {
                this._snackBar.open(err.error.message, 'fermer', {
                    panelClass: ['bg-red-500', 'text-white'],
                    duration: 4000,
                });
            },
        });
    }

    onAddGuest(): void {
        if (this.delegationForm.get('nombre').invalid) {
            return;
        }
        this.invites.clear();
        const nombre = this.delegationForm.get('nombre').value;
        for (let i = 0; i < nombre; i++) {
            this._addGuest();
        }
    }

    removeGuest(i: number): void {
        const nombre = this.delegationForm.get('nombre').value;
        this.invites.removeAt(i);
        this.delegationForm.get('nombre').setValue(nombre - 1);
    }

    private _addGuest(): void {
        this.invites.push(
            new FormGroup({
                id: new FormControl(),
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
            })
        );
    }
}
