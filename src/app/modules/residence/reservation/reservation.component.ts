import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pagination } from '@core/model/pagination.model';
import { Reservation } from '@core/model/reservation.model';
import { ReservationService } from '@core/service/reservation.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable } from 'rxjs';
import { FormReservationComponent } from './form-reservation/form-reservation.component';
import { RequestParams } from '@core/model/params.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit{
  search: string = '';
  data$: Observable<Pagination<Reservation>>;

  page = 1;
  pageSize = 20;

  constructor(private _matDialog: MatDialog,
              private _reservationService: ReservationService,
              private _fuseConfirmation: FuseConfirmationService) {
  }

  ngOnInit(): void {
      this.getAllReserve();
  }

  onSearch(): void {
  }

  openModal(reserve?: Reservation): void {
      this._matDialog.open(FormReservationComponent, {
          autoFocus: false,
          panelClass: 'w-full',
          data: reserve
      });
  }

  getAllReserve(): void {
      const params: RequestParams = {
          page: this.page - 1,
          size: this.pageSize,
          search: this.search
      };
      this.data$ = this._reservationService.getAllReserve(params);
  }

  confirmStatut(id: number): void {
      this._fuseConfirmation.open(
          {
              title: 'confirmation',
              message: 'Voulez-vous changer le statut de l\'Reservation',
              icon: {
                  show: true,
                  name: 'heroicons_solid:question-mark-circle',
                  color: 'primary'
              },
              actions: {
                  confirm: {
                      label: 'OUI',
                      color: 'primary'
                  },
                  cancel: {
                      label: 'NON',
                  }
              }
          }
      ).afterClosed().subscribe((res) => {
          console.log('res', res);
          if (res === 'confirmed') {
              this._reservationService.updateStatutReserve(id).subscribe((response) => {
                  console.log('response', response);
              });
          }
      });
  }

}
