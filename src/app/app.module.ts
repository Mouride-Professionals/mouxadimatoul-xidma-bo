import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HttpClientModule } from '@angular/common/http';

import localeAr from '@angular/common/locales/ar';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import {
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    translocoConfig,
    TranslocoModule,
} from '@ngneat/transloco';
import { AppTranslocoLoader } from '@core/i18n/transloco-loader';
import { LanguageService } from '@core/i18n/language.service';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeAr, 'ar');

export const initializeLanguage =
    (languageService: LanguageService): (() => Promise<void>) =>
    () =>
        languageService.initialize();

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        HttpClientModule,
        TranslocoModule,

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['fr', 'ar'],
                defaultLang: 'fr',
                fallbackLang: 'fr',
                reRenderOnLangChange: true,
                prodMode: false,
            }),
        },
        {
            provide: TRANSLOCO_LOADER,
            useClass: AppTranslocoLoader,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeLanguage,
            deps: [LanguageService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
