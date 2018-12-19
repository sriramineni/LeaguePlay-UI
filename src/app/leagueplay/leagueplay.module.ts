import { NgModule } from '@angular/core';
import { LeaguePlayRouting } from './leagueplay-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './registration/registration.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [LeaguePlayRouting, CommonModule, FormsModule,
        AutoCompleteModule, BrowserAnimationsModule, ButtonModule, DialogModule, InputTextModule],
    declarations: [RegistrationComponent],
    providers: [RegistrationService],
    exports: []
})
export class LeagueModule {

}