import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Accueillant } from '@core/model/accueillant.model';
import { Chambre } from '@core/model/chambre.model';
import { Delegation } from '@core/model/delegation.model';
import { Evenement } from '@core/model/evenement.model';
import { Invite } from '@core/model/invite.model';
import { Pageable } from '@core/model/pageable.model';
import { Residence } from '@core/model/residence.model';
import { Responsable } from '@core/model/responsable.model';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { ChambreService } from '@core/service/chambre/chambre.service';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { EvenementService } from '@core/service/evenement/evenement.service';
import { ReservationService } from '@core/service/reservation/reservation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ResponsableService } from '@core/service/responsable/responsable.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
    reservationForm: FormGroup = new FormGroup({
        checkAll: new FormControl(false),
        ceremonie: new FormControl(),
        period: new FormGroup(
            {
                entree: new FormControl(null, [Validators.required]),
                sortie: new FormControl(null, [Validators.required]),
            },
            [Validators.required]
        ),
        evenement: new FormControl(null, [Validators.required]),
        residence: new FormControl(null, [Validators.required]),
        delegation: new FormControl(),
        invites: new FormArray(
            [],
            [Validators.required, Validators.minLength(1)]
        ),
    });

    events$: Observable<Evenement[]>;
    delegations$: Observable<Delegation[]>;
    residences$: Observable<Residence[]>;
    accueillants: Accueillant[] = [];
    chambres: Chambre[] = [];
    responsables: Responsable[] = [];
    chambresIndisponibles: number[] = [];
    idIndispo: number[] = [];
    inviteDelegations: Invite[] = [];

    constructor(
        private _eventService: EvenementService,
        private _residenceService: ResidenceService,
        private _chambreService: ChambreService,
        private _accueillantService: AccueillantService,
        private _responsableService: ResponsableService,
        private _reservationService: ReservationService,
        private _delagationService: DelegationService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    get f(): any {
        return this.reservationForm.controls;
    }

    get invites(): FormArray {
        return this.reservationForm.get('invites') as FormArray;
    }

    ngOnInit(): void {
        this.delegations$ = this._delagationService
            .getAllDelagations({ page: 0, size: 1000 })
            .pipe(map((data: any) => data.content));

        if (this._residenceService.residence) {
            this.reservationForm
                .get('residence')
                .setValue(this._residenceService.residence.id);
            this.reservationForm.get('residence').disable();
            this.onLoadHotes();
        }
        this.events$ = this._eventService.getAllEvent();
        this.residences$ = this._residenceService.getAllResidences();
    }

    onSubmit(): void {
        if (this.reservationForm.invalid) {
            return;
        }
        this.reservationForm.get('residence').enable();
        this.reservationForm.value.invites =
            this.reservationForm.value.invites.filter(
                (inv: any) => inv.checked
            );
        this._reservationService
            .addReservations(this.reservationForm.value)
            .subscribe({
                next: (res) => {
                    this._snackBar.open(
                        `${res.length} réservation${
                            res.length > 1 ? 's' : ''
                        } effectuée${res.length > 1 ? 's' : ''}`,
                        '',
                        {
                            panelClass: ['bg-green-600', 'text-white'],
                            duration: 3000,
                        }
                    );
                    this._router.navigate(['/reservations']);
                },
                error: (err) => {
                    console.log(err);
                    this._snackBar.open(err.error.message, '', {
                        panelClass: ['bg-red-600', 'text-white'],
                        duration: 3500,
                    });
                },
            });
    }

    onChoiceChambre(chambre: Chambre): void {
        if (chambre) {
            const chambreSelected: number[] = this.invites.value
                .map((i: any) => i.chambre?.id)
                .filter((x: number) => x > 0);
            const idSelected: { [key: number]: number } =
                chambreSelected.reduce(
                    (count, currentValue) => (
                        count[currentValue]
                            ? ++count[currentValue]
                            : (count[currentValue] = 1),
                        count
                    ),
                    {}
                );

            this._updateChambres(this.chambres, idSelected);
        }
    }

    isUnvalaible(chambre: Chambre): boolean {
        chambre.placeChoisie = chambre.placeChoisie ? chambre.placeChoisie : 0;
        return (
            chambre.nombrePlace -
                chambre.placeReservee -
                chambre.placeChoisie <=
            0
        );
    }

    onLoadChambre(): void {
        if (
            this.reservationForm.get('period').get('entree').invalid ||
            this.reservationForm.get('period').get('sortie').invalid ||
            this.reservationForm.get('residence').invalid
        ) {
            this.chambres = [];
            return;
        }
        this._chambreService
            .getAllDisponibleByResidence(
                this.reservationForm.get('residence').value,
                this.reservationForm.get('period').get('entree').value,
                this.reservationForm.get('period').get('sortie').value
            )
            .subscribe((chambres: Chambre[]) => (this.chambres = chambres));
        this.resetChambre();
    }

    onLoadHotes(): void {
        if (this.reservationForm.get('residence').invalid) {
            this.accueillants = [];
            this.responsables = [];
            return;
        }
        this._responsableService
            .getAll({
                page: 0,
                size: 200,
                residence: this.reservationForm.get('residence').value,
            })
            .subscribe((res: Pageable<Responsable>) => {
                this.responsables = res.content;
            });
        this._accueillantService
            .getAll({
                page: 0,
                size: 100,
                residence: this.reservationForm.get('residence').value,
            })
            .subscribe(
                (res: Pageable<Accueillant>) =>
                    (this.accueillants = res.content)
            );
    }

    resetChambre(): void {
        this.invites.controls.forEach((inviteForm: FormGroup) => {
            inviteForm.get('chambre').reset();
        });
        this.idIndispo = [];
    }

    removeGuest(index: number): void {
        this.invites.removeAt(index);
    }

    addGuest(guest?: Invite): void {
        this.invites.push(
            new FormGroup({
                id: new FormControl(guest?.id),
                checked: new FormControl(),
                prenom: new FormControl(guest?.prenom, [
                    Validators.required,
                    Validators.minLength(3),
                ]),
                nom: new FormControl(guest?.nom, [
                    Validators.required,
                    Validators.minLength(2),
                ]),
                telephone: new FormControl(guest?.telephone, [
                    Validators.required,
                    Validators.minLength(9),
                ]),
                chambre: new FormControl(null, [Validators.required]),
                accueillant: new FormControl(null, [Validators.required]),
                responsable: new FormControl(null, [Validators.required]),
                adresse: new FormControl(guest?.adresse),
                email: new FormControl(guest?.email, [Validators.email]),
                presence: new FormControl(),
            })
        );
    }

    onChoiceDelegation(): void {
        const delegation = this.reservationForm.get('delegation')
            .value as Delegation;
        this.inviteDelegations = [];
        if (delegation) {
            this.reservationForm.get('checkAll').setValue(true);
            if (delegation.chef) {
                this.inviteDelegations.push(delegation.chef);
            }
            this.inviteDelegations.push(...delegation.invites);
            this.inviteDelegations.forEach((inv: Invite, index: number) => {
                this.addGuest(inv);
                const inviteForm = this.invites.controls[index];
                inviteForm.get('checked').setValue(true);
            });
        }
    }

    onCheckAll(): void {
        const checked = this.reservationForm.get('checkAll').value;
        if (!checked) {
            this.invites.controls.forEach((ctl: AbstractControl) => {
                ctl.get('checked').setValue(false);
                ctl.get('chambre').reset();
                ctl.get('chambre').disable();
                ctl.get('accueillant').reset();
                ctl.get('accueillant').disable();
                ctl.get('presence').reset();
                ctl.get('presence').disable();
            });
        } else {
            this.invites.controls.forEach((ctl: AbstractControl) => {
                ctl.get('checked').setValue(true);
                ctl.get('chambre').enable();
                ctl.get('accueillant').enable();
                ctl.get('presence').enable();
            });
        }
    }

    onCheckInvite(index: number): void {
        const inviteForm = this.invites.controls[index];
        const checked = inviteForm.get('checked').value;
        if (!checked) {
            inviteForm.get('chambre').reset();
            inviteForm.get('chambre').disable();
            inviteForm.get('accueillant').reset();
            inviteForm.get('accueillant').disable();
            inviteForm.get('presence').reset();
            inviteForm.get('presence').disable();
            this.reservationForm.get('checkAll').setValue(false);
        } else {
            inviteForm.get('chambre').enable();
            inviteForm.get('accueillant').enable();
            inviteForm.get('presence').enable();
            this.reservationForm
                .get('checkAll')
                .setValue(
                    this.invites.controls.every(
                        (control: AbstractControl) =>
                            control.get('checked').value === true
                    )
                );
        }
    }

    onPresence(): void {
        this.reservationForm
            .get('ceremonie')
            .setValue(
                this.invites.controls.every(
                    (ctl: AbstractControl) => ctl.get('presence').value
                )
            );
    }

    onChoiceAllPresence(): void {
        const value = this.reservationForm.get('ceremonie').value;
        this.invites.controls.forEach((ctl: AbstractControl) => {
            if (ctl.get('checked').value) {
                ctl.get('presence').setValue(value);
            }
        });
    }

    private _updateChambres(
        chambres: Chambre[],
        idSelected: { [key: number]: number }
    ): void {
        chambres.forEach((chambre) => {
            const places = idSelected[chambre.id];
            if (places) {
                chambre.placeChoisie = places;
            } else {
                chambre.placeChoisie = 0;
            }
        });
    }
}
