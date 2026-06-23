import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { DateAdapter } from '@angular/material/core';
import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
    let service: LanguageService;
    let translocoService: jasmine.SpyObj<TranslocoService>;
    let dateAdapter: jasmine.SpyObj<DateAdapter<unknown>>;
    let directionality: Directionality;

    const setBrowserLanguages = (
        languages: readonly string[],
        language: string
    ): void => {
        spyOnProperty(navigator, 'languages', 'get').and.returnValue(
            languages as readonly string[]
        );
        spyOnProperty(navigator, 'language', 'get').and.returnValue(language);
    };

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.lang = 'fr';
        document.documentElement.dir = 'ltr';
        document.body.className = '';

        translocoService = jasmine.createSpyObj<TranslocoService>(
            'TranslocoService',
            ['setActiveLang']
        );
        dateAdapter = jasmine.createSpyObj<DateAdapter<unknown>>(
            'DateAdapter',
            ['setLocale']
        );
        directionality = {
            value: 'ltr',
            change: new EventEmitter<'ltr' | 'rtl'>(),
        } as Directionality;

        TestBed.configureTestingModule({
            providers: [
                LanguageService,
                { provide: TranslocoService, useValue: translocoService },
                { provide: DOCUMENT, useValue: document },
                { provide: DateAdapter, useValue: dateAdapter },
                { provide: Directionality, useValue: directionality },
            ],
        });

        service = TestBed.inject(LanguageService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('uses Arabic from the browser on first visit', () => {
        setBrowserLanguages(['ar-SN', 'fr-FR'], 'fr-FR');

        service.initialize();

        expect(service.activeLanguage).toBe('ar');
        expect(translocoService.setActiveLang).toHaveBeenCalledWith('ar');
        expect(document.documentElement.lang).toBe('ar');
        expect(document.documentElement.dir).toBe('rtl');
        expect(document.body.classList).toContain('lang-ar');
        expect(document.body.classList).toContain('dir-rtl');
        expect(dateAdapter.setLocale).toHaveBeenCalledWith('ar');
        expect(directionality.value).toBe('rtl');
    });

    it('falls back to French for unsupported browser languages', () => {
        setBrowserLanguages(['en-US'], 'en-US');

        service.initialize();

        expect(service.activeLanguage).toBe('fr');
        expect(translocoService.setActiveLang).toHaveBeenCalledWith('fr');
        expect(document.documentElement.lang).toBe('fr');
        expect(document.documentElement.dir).toBe('ltr');
    });

    it('lets a stored manual choice override the browser language', () => {
        localStorage.setItem('khidma.language', 'fr');
        setBrowserLanguages(['ar'], 'ar');

        service.initialize();

        expect(service.activeLanguage).toBe('fr');
        expect(document.documentElement.dir).toBe('ltr');
    });

    it('persists manual language changes', () => {
        service.setLanguage('ar');

        expect(localStorage.getItem('khidma.language')).toBe('ar');
        expect(document.documentElement.dir).toBe('rtl');
    });
});
