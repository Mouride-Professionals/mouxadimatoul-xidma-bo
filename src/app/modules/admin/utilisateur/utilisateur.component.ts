import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilisateurFormeComponent } from '@modules/admin/utilisateur/utilisateur-forme/utilisateur-forme.component';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { Observable } from 'rxjs';
import { Utilisateur } from '@core/model/utilisateur.model';
import { RequestParams } from '@core/model/params.model';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { Pageable } from '@core/model/pageable.model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-utilisateur',
    templateUrl: './utilisateur.component.html',
    styleUrls: ['./utilisateur.component.scss'],
})
export class UtilisateurComponent implements OnInit {
    search: string = '';
    data$: Observable<Pageable<Utilisateur>>;

    roleItems: { labelKey: string; value: string }[] = [
        { labelKey: 'common.all', value: '' },
        { labelKey: 'roles.admin', value: 'admin' },
        { labelKey: 'roles.responsable', value: 'responsable' },
    ];

    role: string = '';
    page = 1;
    pageSize = 20;

    constructor(
        private _matDialog: MatDialog,
        private _utilisateurService: UtilisateurService,
        private _fuseConfirmation: FuseConfirmationService,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    onFilterByRole(value: string): void {
        this.role = value;
        this.getAllUsers();
    }

    onSearch(): void {}

    openModal(user?: Utilisateur): void {
        this._matDialog
            .open(UtilisateurFormeComponent, {
                autoFocus: false,
                panelClass: ['w-full', 'md:w-160'],
                data: user,
            })
            .afterClosed()
            .subscribe((reload) => {
                if (reload) {
                    this.getAllUsers();
                }
            });
    }

    getAllUsers(): void {
        const params: RequestParams = {
            page: this.page - 1,
            size: this.pageSize,
            search: this.search,
        };
        this.data$ = this._utilisateurService.getAllUsers(params, this.role);
    }

    confirmStatut(id: number): void {
        this._fuseConfirmation
            .open({
                title: this._translocoService.translate('common.confirmation'),
                message: this._translocoService.translate(
                    'users.confirmStatus'
                ),
                icon: {
                    show: true,
                    name: 'heroicons_solid:question-mark-circle',
                    color: 'primary',
                },
                actions: {
                    confirm: {
                        label: this._translocoService.translate('common.yes'),
                        color: 'primary',
                    },
                    cancel: {
                        label: this._translocoService.translate('common.no'),
                    },
                },
            })
            .afterClosed()
            .subscribe((res) => {
                console.log('res', res);
                if (res === 'confirmed') {
                    this._utilisateurService
                        .updateStatutUser(id)
                        .subscribe((response) => {
                            console.log('response', response);
                        });
                }
            });
    }
}
