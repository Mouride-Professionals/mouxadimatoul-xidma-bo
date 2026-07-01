import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { Delegation } from '@core/model/delegation.model';
import { Residence } from '@core/model/residence.model';
import { Utilisateur } from '@core/model/utilisateur.model';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { Pageable } from '@core/model/pageable.model';

export type SearchResult = {
    label: string;
    sublabel?: string;
    route: string[];
};

export type SearchGroup = {
    labelKey: string;
    icon: string;
    items: SearchResult[];
};

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
    searchCtrl = new FormControl('');
    groups: SearchGroup[] = [];
    searching = false;

    private _unsubscribe$ = new Subject<void>();

    constructor(
        private _router: Router,
        private _residenceService: ResidenceService,
        private _delegationService: DelegationService,
        private _utilisateurService: UtilisateurService
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(
                takeUntil(this._unsubscribe$),
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(query => {
                    const q = (query || '').trim();
                    if (q.length < 2) {
                        this.groups = [];
                        this.searching = false;
                        return of(null);
                    }
                    this.searching = true;
                    return forkJoin({
                        residences: this._residenceService
                            .getAllResidences()
                            .pipe(catchError(() => of([] as Residence[]))),
                        delegations: this._delegationService
                            .getAllDelagations({ page: 0, size: 5, search: q })
                            .pipe(catchError(() => of({ content: [] } as Pageable<Delegation>))),
                        agents: this._utilisateurService
                            .getAllUsers({ page: 0, size: 5, search: q }, 'KHIDMA_AGENT')
                            .pipe(catchError(() => of({ content: [] } as Pageable<Utilisateur>))),
                    });
                })
            )
            .subscribe(result => {
                if (!result) return;
                const q = (this.searchCtrl.value || '').trim().toLowerCase();
                this.searching = false;
                this.groups = [];

                const residences = (result.residences as Residence[])
                    .filter(
                        r =>
                            r.libelle?.toLowerCase().includes(q) ||
                            r.adresse?.toLowerCase().includes(q)
                    )
                    .slice(0, 5);
                if (residences.length) {
                    this.groups.push({
                        labelKey: 'search.residences',
                        icon: 'mat_solid:home',
                        items: residences.map(r => ({
                            label: r.libelle,
                            sublabel: r.adresse,
                            route: ['/residences', String(r.id)],
                        })),
                    });
                }

                const delegations = result.delegations.content;
                if (delegations.length) {
                    this.groups.push({
                        labelKey: 'search.delegations',
                        icon: 'heroicons_outline:user-group',
                        items: delegations.map(d => ({
                            label: d.nom,
                            sublabel: `${d.chef?.prenom ?? ''} ${d.chef?.nom ?? ''}`.trim(),
                            route: ['/delegations', String(d.id)],
                        })),
                    });
                }

                const agents = result.agents.content;
                if (agents.length) {
                    this.groups.push({
                        labelKey: 'search.agents',
                        icon: 'heroicons_solid:user',
                        items: agents.map(a => ({
                            label: `${a.prenom} ${a.nom}`,
                            sublabel: a.telephone,
                            route: ['/utilisateurs'],
                        })),
                    });
                }
            });
    }

    get hasResults(): boolean {
        return this.groups.some(g => g.items.length > 0);
    }

    get queryTooShort(): boolean {
        return (this.searchCtrl.value || '').trim().length < 2;
    }

    navigate(result: SearchResult): void {
        this._router.navigate(result.route);
        this.searchCtrl.setValue('', { emitEvent: false });
        this.groups = [];
    }

    displayFn(): string {
        return '';
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
