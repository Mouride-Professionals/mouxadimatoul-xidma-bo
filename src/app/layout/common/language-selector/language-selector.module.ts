import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LanguageSelectorComponent } from './language-selector.component';

@NgModule({
    declarations: [LanguageSelectorComponent],
    imports: [SharedModule],
    exports: [LanguageSelectorComponent],
})
export class LanguageSelectorModule {}
