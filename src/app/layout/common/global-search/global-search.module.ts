import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { TranslocoModule } from '@ngneat/transloco';
import { GlobalSearchComponent } from './global-search.component';

@NgModule({
    declarations: [GlobalSearchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        TranslocoModule,
    ],
    exports: [GlobalSearchComponent],
})
export class GlobalSearchModule {}
