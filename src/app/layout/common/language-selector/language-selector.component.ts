import { Component } from '@angular/core';
import {
    AppLanguage,
    AppLanguageOption,
    LanguageService,
} from '@core/i18n/language.service';

@Component({
    selector: 'language-selector',
    templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
    readonly languages: AppLanguageOption[] = this._languageService.languages;
    readonly activeLanguage$ = this._languageService.activeLanguage$;

    constructor(private _languageService: LanguageService) {}

    setLanguage(language: AppLanguage): void {
        this._languageService.setLanguage(language);
    }
}
