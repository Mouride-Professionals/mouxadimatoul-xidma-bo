import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Assignment, Responsibility } from '@core/model/assignment.model';
import { AssignmentService } from '@core/service/assignment/assignment.service';
import { TranslocoService } from '@ngneat/transloco';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    ResidencesAssignmentFormComponent,
    AssignmentFormData,
} from '../residences-assignment-form/residences-assignment-form.component';

@Component({
    selector: 'app-residences-team',
    templateUrl: './residences-team.component.html',
    styleUrls: ['./residences-team.component.scss'],
})
export class ResidencesTeamComponent implements OnInit {
    @Input() residenceId: number;

    assignments: Assignment[] = [];
    loading = false;

    constructor(
        private _assignmentService: AssignmentService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _transloco: TranslocoService,
        private _fuseConfirmation: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadAssignments();
    }

    loadAssignments(): void {
        this.loading = true;
        this._assignmentService
            .getAllByResidence(this.residenceId)
            .subscribe({
                next: res => {
                    this.assignments = res.content;
                    this.loading = false;
                },
                error: () => (this.loading = false),
            });
    }

    onAdd(): void {
        this._matDialog
            .open(ResidencesAssignmentFormComponent, {
                panelClass: ['w-full', 'max-w-140'],
                data: { residenceId: this.residenceId } as AssignmentFormData,
            })
            .afterClosed()
            .subscribe((result: Assignment) => {
                if (result) {
                    this.loadAssignments();
                }
            });
    }

    onEdit(assignment: Assignment): void {
        this._matDialog
            .open(ResidencesAssignmentFormComponent, {
                panelClass: ['w-full', 'max-w-140'],
                data: { residenceId: this.residenceId, assignment } as AssignmentFormData,
            })
            .afterClosed()
            .subscribe((result: Assignment) => {
                if (result) {
                    this.loadAssignments();
                }
            });
    }

    onDelete(assignment: Assignment): void {
        this._fuseConfirmation
            .open({
                title: this._transloco.translate('common.confirmation'),
                message: this._transloco.translate('assignments.confirmDelete', {
                    name: this.agentLabel(assignment),
                }),
                icon: {
                    show: true,
                    name: 'heroicons_solid:trash',
                    color: 'warn',
                },
                actions: {
                    confirm: {
                        label: this._transloco.translate('common.delete'),
                        color: 'warn',
                    },
                    cancel: {
                        label: this._transloco.translate('common.cancel'),
                    },
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result !== 'confirmed') return;
                this._assignmentService.delete(assignment.id!).subscribe({
                    next: () => {
                        this._snackBar.open(
                            this._transloco.translate('assignments.messages.deleted'),
                            '',
                            { panelClass: ['bg-green-500', 'text-white'], duration: 3000 }
                        );
                        this.loadAssignments();
                    },
                });
            });
    }

    responsibilityLabel(r: Responsibility): string {
        return this._transloco.translate(`assignments.responsibilities.${r}`);
    }

    agentLabel(a: Assignment): string {
        return `${a.agent.prenom} ${a.agent.nom}`;
    }
}
