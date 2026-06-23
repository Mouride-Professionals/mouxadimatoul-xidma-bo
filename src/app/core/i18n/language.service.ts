import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DateAdapter } from '@angular/material/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppLanguage = 'fr' | 'ar';

export interface AppLanguageOption {
    code: AppLanguage;
    label: string;
    nativeLabel: string;
    direction: 'ltr' | 'rtl';
    dateLocale: string;
}

const STORAGE_KEY = 'khidma.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    readonly languages: AppLanguageOption[] = [
        {
            code: 'fr',
            label: 'Francais',
            nativeLabel: 'Francais',
            direction: 'ltr',
            dateLocale: 'fr-FR',
        },
        {
            code: 'ar',
            label: 'Arabe',
            nativeLabel: 'العربية',
            direction: 'rtl',
            dateLocale: 'ar',
        },
    ];

    private readonly _activeLanguage = new BehaviorSubject<AppLanguage>('fr');

    constructor(
        private _translocoService: TranslocoService,
        @Inject(DOCUMENT) private _document: Document,
        @Optional() private _dateAdapter?: DateAdapter<unknown>,
        @Optional() private _directionality?: Directionality
    ) {}

    get activeLanguage$(): Observable<AppLanguage> {
        return this._activeLanguage.asObservable();
    }

    get activeLanguage(): AppLanguage {
        return this._activeLanguage.value;
    }

    initialize(): void {
        this.setLanguage(this._resolveInitialLanguage(), false);
    }

    setLanguage(language: AppLanguage, persist: boolean = true): void {
        const option = this._getLanguageOption(language);

        this._translocoService.setActiveLang(option.code);
        this._activeLanguage.next(option.code);
        this._syncDocument(option);
        this._dateAdapter?.setLocale(option.dateLocale);
        this._syncDirectionality(option);

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, option.code);
            } catch {
                // Ignore storage failures; language still changes for this session.
            }
        }
    }

    private _resolveInitialLanguage(): AppLanguage {
        const storedLanguage = this._readStoredLanguage();

        if (storedLanguage) {
            return storedLanguage;
        }

        const browserLanguages =
            typeof navigator !== 'undefined'
                ? [...(navigator.languages || []), navigator.language]
                : [];

        const browserLanguage = browserLanguages.find(Boolean);

        if (browserLanguage?.toLowerCase().startsWith('ar')) {
            return 'ar';
        }

        if (browserLanguage?.toLowerCase().startsWith('fr')) {
            return 'fr';
        }

        return 'fr';
    }

    private _readStoredLanguage(): AppLanguage | null {
        try {
            const value = localStorage.getItem(STORAGE_KEY);
            return this._isSupportedLanguage(value) ? value : null;
        } catch {
            return null;
        }
    }

    private _isSupportedLanguage(value: string | null): value is AppLanguage {
        return value === 'fr' || value === 'ar';
    }

    private _getLanguageOption(language: AppLanguage): AppLanguageOption {
        return (
            this.languages.find(option => option.code === language) ||
            this.languages[0]
        );
    }

    private _syncDocument(option: AppLanguageOption): void {
        const html = this._document.documentElement;
        const body = this._document.body;

        html.lang = option.code;
        html.dir = option.direction;

        body.classList.remove('lang-fr', 'lang-ar', 'dir-ltr', 'dir-rtl');
        body.classList.add(`lang-${option.code}`, `dir-${option.direction}`);
    }

    private _syncDirectionality(option: AppLanguageOption): void {
        if (!this._directionality) {
            return;
        }

        (this._directionality as any).value = option.direction;
        this._directionality.change.emit(option.direction);
    }
}
