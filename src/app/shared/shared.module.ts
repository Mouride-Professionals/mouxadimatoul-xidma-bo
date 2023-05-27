import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

const LIST_MODULES = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ...LIST_MODULES],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, ...LIST_MODULES],
})
export class SharedModule {}
