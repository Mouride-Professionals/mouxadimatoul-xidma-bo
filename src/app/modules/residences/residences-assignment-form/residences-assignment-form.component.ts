import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { translateApiError } from '@core/i18n/api-error-message';
import {
    ALL_DAYS,
    ALL_RESPONSIBILITIES,
    Assignment,
    DayOfWeek,
    Responsibility,
} from '@core/model/assignment.model';
import { Utilisateur } from '@core/model/utilisateur.model';
import { AssignmentService } from '@core/service/assignment/assignment.service';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { TranslocoService } from '@ngneat/transloco';

export type AssignmentFormData = {
    residenceId: number;
    assignment?: Assignment;
};

@Component({
    selector: 'app-residences-assignment-form',
    templateUrl: './residences-assignment-form.component.html',
    styleUrls: ['./residences-assignment-form.component.scss'],
})
export class ResidencesAssignmentFormComponent implements OnInit {
    agents: Utilisateur[] = [];
    allResponsibilities: Responsibility[] = ALL_RESPONSIBILITIES;
    allDays: (DayOfWeek | null)[] = [null, ...ALL_DAYS];

    form: FormGroup = new FormGroup({
        agentId: new FormControl<number | null>(null, Validators.required),
        responsibilities: new FormControl<Responsibility[]>([], Validators.required),
        startDate: new FormControl<string | null>(null),
        endDate: new FormControl<string | null>(null),
        rotationSlots: new FormArray([]),
    });

    get isEdit(): boolean {
        return !!this.data.assignment;
    }

    get slots(): FormArray {
        return this.form.controls['rotationSlots'] as FormArray;
    }

    constructor(
        private _dialogRef: MatDialogRef<ResidencesAssignmentFormComponent>,
        private _assignmentService: AssignmentService,
        private _utilisateurService: UtilisateurService,
        private _snackBar: MatSnackBar,
        private _transloco: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: AssignmentFormData
    ) {}

    ngOnInit(): void {
        this._utilisateurService
            .getAllUsers({ page: 0, size: 200 }, 'KHIDMA_AGENT')
            .subscribe(res => (this.agents = res.content));

        if (this.data.assignment) {
            const a = this.data.assignment;
            this.form.patchValue({
                agentId: a.agent.id,
                responsibilities: a.responsibilities,
                startDate: a.startDate ?? null,
                endDate: a.endDate ?? null,
            });
            (a.rotationSlots ?? []).forEach(s => this.addSlot(s.dayOfWeek, s.fromTime, s.toTime));
        }
    }

    addSlot(day: DayOfWeek | null = null, from = '', to = ''): void {
        this.slots.push(
            new FormGroup({
                dayOfWeek: new FormControl<DayOfWeek | null>(day),
                fromTime: new FormControl<string>(from, Validators.required),
                toTime: new FormControl<string>(to, Validators.required),
            })
        );
    }

    removeSlot(index: number): void {
        this.slots.removeAt(index);
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.form.disable();
        const v = this.form.value;
        const request = {
            agentId: v.agentId,
            residenceId: this.data.residenceId,
            responsibilities: v.responsibilities,
            startDate: v.startDate,
            endDate: v.endDate,
            rotationSlots: v.rotationSlots,
        };

        const call = this.isEdit
            ? this._assignmentService.update(this.data.assignment!.id!, request)
            : this._assignmentService.save(request);

        call.subscribe({
            next: (result: Assignment) => {
                this._snackBar.open(
                    this._transloco.translate(
                        this.isEdit
                            ? 'assignments.messages.updated'
                            : 'assignments.messages.created'
                    ),
                    '',
                    { panelClass: ['bg-green-500', 'text-white'], duration: 3000 }
                );
                this._dialogRef.close(result);
            },
            error: (err: any) => {
                this.form.enable();
                this._snackBar.open(translateApiError(this._transloco, err), '', {
                    panelClass: ['bg-red-500', 'text-white'],
                    duration: 4000,
                });
            },
        });
    }

    onCancel(): void {
        this._dialogRef.close();
    }

    responsibilityLabel(r: Responsibility): string {
        return this._transloco.translate(`assignments.responsibilities.${r}`);
    }

    dayLabel(d: DayOfWeek | null): string {
        return d
            ? this._transloco.translate(`assignments.days.${d}`)
            : this._transloco.translate('assignments.form.allDays');
    }
}
