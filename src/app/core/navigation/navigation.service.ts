import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<FuseNavigationItem[]> =
        new ReplaySubject<FuseNavigationItem[]>(1);
    private _rawNavigation: FuseNavigationItem[] = [];

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _translocoService: TranslocoService
    ) {
        this._translocoService.langChanges$
            .pipe(switchMap(lang => this._translocoService.load(lang)))
            .subscribe(() => {
                if (this._rawNavigation.length) {
                    this._navigation.next(this._translateNavigation());
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<FuseNavigationItem[]> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<FuseNavigationItem[]> {
        return this._httpClient
            .get<FuseNavigationItem[]>('api/common/navigation')
            .pipe(
                tap((navigation) => {
                    this._rawNavigation = navigation;
                }),
                switchMap(() =>
                    this._translocoService.load(
                        this._translocoService.getActiveLang()
                    )
                ),
                map(() => this._translateNavigation()),
                tap((navigation) => {
                    this._navigation.next(navigation);
                })
            );
    }

    private _translateNavigation(
        items: FuseNavigationItem[] = this._rawNavigation
    ): FuseNavigationItem[] {
        return items.map((item) => {
            const translationKey = item.meta?.translationKey;
            const translatedItem: FuseNavigationItem = {
                ...item,
                title: translationKey
                    ? this._translocoService.translate(translationKey)
                    : item.title,
            };

            if (item.children?.length) {
                translatedItem.children = this._translateNavigation(
                    item.children
                );
            }

            return translatedItem;
        });
    }
}
