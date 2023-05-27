import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UtilisateurFormeComponent} from '@modules/admin/utilisateur/utilisateur-forme/utilisateur-forme.component';
import {UtilisateurService} from '@core/service/utilisateur.service';
import {Observable} from 'rxjs';
import {Utilisateur} from '@core/model/utilisateur.model';
import {Pagination} from '@core/model/pagination.model';
import {RequestParams} from '@core/model/params.model';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';


@Component({
    selector: 'app-utilisateur',
    templateUrl: './utilisateur.component.html',
    styleUrls: ['./utilisateur.component.scss'],
})
export class UtilisateurComponent implements OnInit {
    search: string = '';
    data$: Observable<Pagination<Utilisateur>>;

    page = 1;
    pageSize = 20;

    constructor(private _matDialog: MatDialog,
                private _utilisateurService: UtilisateurService,
                private _fuseConfirmation: FuseConfirmationService) {
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    onSearch(): void {
    }

    openModal(user?: Utilisateur): void {
        this._matDialog.open(UtilisateurFormeComponent, {
            autoFocus: false,
            panelClass: 'w-full',
            data: user
        });
    }

    getAllUsers(): void {
        const params: RequestParams = {
            page: this.page - 1,
            size: this.pageSize,
            search: this.search
        };
        this.data$ = this._utilisateurService.getAllUsers(params);
    }

    confirmStatut(id: number): void {
        this._fuseConfirmation.open(
            {
                title: 'confirmation',
                message: 'Voulez-vous changer le statut de l\'utilisateur',
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
                this._utilisateurService.updateStatutUser(id).subscribe((response) => {
                    console.log('response', response);
                });
            }
        });
    }
}
