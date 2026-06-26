import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { FuseCardModule } from '@fuse/components/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SummarizePipe } from './pipes/summarize/summarize.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TranslocoModule } from '@ngneat/transloco';

const LIST_MODULES = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FuseCardModule,
    MatSlideToggleModule,
    FuseConfirmationModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    NgApexchartsModule,
    TranslocoModule,
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ...LIST_MODULES],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SummarizePipe,
        PaginatorComponent,
        ...LIST_MODULES,
    ],
    declarations: [SummarizePipe, PaginatorComponent],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class SharedModule {}
