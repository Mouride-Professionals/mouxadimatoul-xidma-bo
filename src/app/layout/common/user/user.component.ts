import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { Utilisateur } from '@core/model/utilisateur.model';
import { UtilisateurService } from '@core/service/utilisateur.service';
import { AuthService } from '@core/auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
    @Input() showAvatar: boolean = true;
    user: Utilisateur;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private _utilisateurService: UtilisateurService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        // Subscribe to navigation data
        this._utilisateurService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: Utilisateur) => {
                this.user = user;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._authService.signOut().subscribe(() => {
            this._router.navigate(['/connexion']);
        });
    }
}
