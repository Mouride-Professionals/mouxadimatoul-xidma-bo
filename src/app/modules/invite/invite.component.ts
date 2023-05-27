import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormInviteComponent } from './form-invite/form-invite.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {
  search: string = '';

    constructor(private _matDialog: MatDialog) {
    }
    onSearch(): void {}

    addNewInvite(): void {
        this._matDialog.open(FormInviteComponent, {
            autoFocus: false,
            panelClass: 'w-full',
            data     : {
                user: {}
            }
        });
    }
}
