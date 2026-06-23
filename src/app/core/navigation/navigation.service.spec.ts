import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TranslocoService } from '@ngneat/transloco';
import { of, Subject } from 'rxjs';

import { FuseNavigationItem } from '@fuse/components/navigation';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
    let service: NavigationService;
    let httpMock: HttpTestingController;
    let langChanges$: Subject<string>;
    let activeLang: 'fr' | 'ar';

    const navigation: FuseNavigationItem[] = [
        {
            id: 'dashboard',
            title: 'navigation.dashboard',
            type: 'basic',
            link: '/dashboard',
            meta: {
                roles: ['ROLE_ADMIN', 'ROLE_ACCUEILLANT'],
                translationKey: 'navigation.dashboard',
            },
        },
        {
            id: 'utilisateurs',
            title: 'navigation.users',
            type: 'basic',
            link: '/utilisateurs',
            meta: {
                roles: ['ROLE_ADMIN'],
                translationKey: 'navigation.users',
            },
        },
    ];

    beforeEach(() => {
        langChanges$ = new Subject<string>();
        activeLang = 'fr';

        const translocoService = {
            langChanges$: langChanges$.asObservable(),
            getActiveLang: (): string => activeLang,
            load: () => of({}),
            translate: (key: string): string => `${activeLang}:${key}`,
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NavigationService,
                { provide: TranslocoService, useValue: translocoService },
            ],
        });

        service = TestBed.inject(NavigationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('translates loaded navigation while preserving role metadata', () => {
        const emittedNavigation: FuseNavigationItem[][] = [];
        service.navigation$.subscribe(items => emittedNavigation.push(items));

        service.get().subscribe();
        httpMock.expectOne('api/common/navigation').flush(navigation);

        expect(emittedNavigation.length).toBe(1);
        expect(emittedNavigation[0][0].title).toBe('fr:navigation.dashboard');
        expect(emittedNavigation[0][0].meta?.roles).toEqual([
            'ROLE_ADMIN',
            'ROLE_ACCUEILLANT',
        ]);
        expect(emittedNavigation[0][1].title).toBe('fr:navigation.users');
        expect(emittedNavigation[0][1].meta?.roles).toEqual(['ROLE_ADMIN']);
    });

    it('retranslates navigation after language changes without changing role visibility data', () => {
        const emittedNavigation: FuseNavigationItem[][] = [];
        service.navigation$.subscribe(items => emittedNavigation.push(items));

        service.get().subscribe();
        httpMock.expectOne('api/common/navigation').flush(navigation);

        activeLang = 'ar';
        langChanges$.next('ar');

        expect(emittedNavigation.length).toBe(2);
        expect(emittedNavigation[1][0].title).toBe('ar:navigation.dashboard');
        expect(emittedNavigation[1][0].meta?.roles).toEqual([
            'ROLE_ADMIN',
            'ROLE_ACCUEILLANT',
        ]);
        expect(emittedNavigation[1][1].title).toBe('ar:navigation.users');
        expect(emittedNavigation[1][1].meta?.roles).toEqual(['ROLE_ADMIN']);
    });
});
