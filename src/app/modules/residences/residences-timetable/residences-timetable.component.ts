import { Component, Input, OnInit } from '@angular/core';
import { ALL_DAYS, Assignment, DayOfWeek, RotationSlot } from '@core/model/assignment.model';
import { AssignmentService } from '@core/service/assignment/assignment.service';
import { TranslocoService } from '@ngneat/transloco';

interface TimetableCell {
    lines: string[];
    permanent: boolean;
}

interface TimetableRow {
    assignment: Assignment;
    cells: { [day: string]: TimetableCell };
}

@Component({
    selector: 'app-residences-timetable',
    templateUrl: './residences-timetable.component.html',
    styleUrls: ['./residences-timetable.component.scss'],
})
export class ResidencesTimetableComponent implements OnInit {
    @Input() residenceId: number;
    @Input() residenceName = '';

    days = ALL_DAYS;
    rows: TimetableRow[] = [];
    loading = false;

    constructor(
        private _assignmentService: AssignmentService,
        private _transloco: TranslocoService
    ) {}

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading = true;
        this._assignmentService.getAllByResidence(this.residenceId).subscribe({
            next: res => {
                this.rows = res.content.map(a => this._buildRow(a));
                this.loading = false;
            },
            error: () => (this.loading = false),
        });
    }

    dayLabel(day: DayOfWeek): string {
        return this._transloco.translate(`assignments.days.${day}`);
    }

    responsibilityLabel(r: string): string {
        return this._transloco.translate(`assignments.responsibilities.${r}`);
    }

    print(): void {
        window.print();
    }

    private _buildRow(assignment: Assignment): TimetableRow {
        const cells: { [day: string]: TimetableCell } = {};
        const slots = assignment.rotationSlots ?? [];

        for (const day of this.days) {
            cells[day] = { lines: [], permanent: false };
        }

        if (slots.length === 0) {
            for (const day of this.days) {
                cells[day].permanent = true;
            }
        } else {
            for (const slot of slots) {
                const time = this._formatSlot(slot);
                if (slot.dayOfWeek === null) {
                    for (const day of this.days) {
                        cells[day].lines.push(time);
                    }
                } else {
                    cells[slot.dayOfWeek].lines.push(time);
                }
            }
        }

        return { assignment, cells };
    }

    private _formatSlot(slot: RotationSlot): string {
        const from = slot.fromTime ? slot.fromTime.substring(0, 5) : '';
        const to = slot.toTime ? slot.toTime.substring(0, 5) : '';
        return `${from} – ${to}`;
    }
}
