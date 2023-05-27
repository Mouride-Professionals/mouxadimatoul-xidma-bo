import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormEvenementComponent } from './form-evenement/form-evenement.component';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent {
  search: string = '';

  constructor(private _matDialog: MatDialog) {
  }
  onSearch(): void {}

  addNewEvent(): void {
      this._matDialog.open(FormEvenementComponent, {
          autoFocus: false,
          panelClass: 'w-300',
          data     : {
              user: {}
          }
      });
  }
}
