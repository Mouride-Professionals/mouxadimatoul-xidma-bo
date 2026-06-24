import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { NavigationService } from '@core/navigation/navigation.service';
import { Utilisateur } from '@core/model/utilisateur.model';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { AuthService } from '@core/auth/auth.service';
import { LanguageService } from '@core/i18n/language.service';

@Component({
    selector: 'classic-layout',
    templateUrl: './classic.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
    isNavigationOverlay: boolean;
    navigationPosition: 'left' | 'right' = 'left';
    navigation: FuseNavigationItem[];
    utilisateur: Utilisateur;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _authService: AuthService,
        private _languageService: LanguageService,
        private _utilisateurService: UtilisateurService,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._utilisateurService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: Utilisateur) => {
                this.utilisateur = user;
            });

        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(
                takeUntil(this._unsubscribeAll),
                map((navs: FuseNavigationItem[]) =>
                    navs.filter((nav: FuseNavigationItem) =>
                        nav.meta?.roles?.includes(
                            this._authService.getRoles()[0]
                        )
                    )
                )
            )
            .subscribe((navigation: FuseNavigationItem[]) => {
                this.navigation = navigation;
            });

        this._languageService.activeLanguage$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((language) => {
                this.navigationPosition = language === 'ar' ? 'right' : 'left';
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isNavigationOverlay = !matchingAliases.includes('lg');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
