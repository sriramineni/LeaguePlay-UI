import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from './registration.service';
import { RegistrationFormData, Facility, ErrorResponse, KeyValue, RegistrationRequestModel } from './registration.model';
import { Location } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
    selector: 'league-registration',
    templateUrl: './registration.template.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

    regFormData: RegistrationFormData = new RegistrationFormData();
    player2Suggesitions: KeyValue[] = [];
    stateSuggesitions: string[] = [];
    facilitySuggesition: Facility[] = [];

    canShowPlayer2: boolean = false;
    canShowFields: boolean = false;
    canShowPlayerInviteDig: boolean = false;

    msgs: Message[] = [];
    disableButtons: boolean = false;

    @ViewChild("registerForm") registerForm: ElementRef;
    regReqModel: RegistrationRequestModel;
    formAction: string = AppSettings.END_POINT + '/registerleague';

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private registrationService: RegistrationService) {
        this.regReqModel = this.registrationService.regReqModel;
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            let userId = params['userId'];
            let leagueId = params['leagueId'];
            console.log(`User Id: ${userId}, League Id: ${leagueId}`);
            //this.location.replaceState('/register-league');
            this.location.go('/register-league');
            this.regReqModel.userId = userId;
            this.regReqModel.leagueId = leagueId;
            this.loadRegistrationFormData();
        });
    }

    ngOnDestroy(): void {

    }

    loadRegistrationFormData(): void {
        this.registrationService.fetchRegFormData().subscribe(response => {
            console.log('Registration form data:', response);
            if (response instanceof ErrorResponse) {
                this.showMessage('error', '', response.message);
                this.disableButtons = true;
                return;
            }
            this.regFormData = response;
            this.player2Suggesitions = this.regFormData.player2List;
            this.stateSuggesitions = this.regFormData.stateList;
            this.canShowPlayer2 = !!this.regFormData.player2List;
            this.canShowFields = !this.canShowPlayer2;
        });
    }

    loadFacilities(state: string): void {
        console.log(`Loading facilities for state: ${state}`);
        this.regReqModel.state = state;
        this.registrationService.fetchFacilities().subscribe(response => {
            if (response instanceof ErrorResponse) {
                this.showMessage('error', 'Problem loading facilities', response.message);
                return;
            }
            this.regFormData.facilityList = response;
            this.facilitySuggesition = this.regFormData.facilityList;
        });
    }

    sendEmailInvite(): void {
        console.log(`Sending email to: ${this.regReqModel.player2Email}`);
        this.registrationService.sendEmailInvite().subscribe(response => {
            if (response instanceof ErrorResponse) {
                this.showMessage('error', '', response.message);
                return;
            }
            this.showMessage('success', '', response.message);
            this.canShowPlayerInviteDig = false;
            this.disableButtons = true;    
        });
    }

    showInviteDialog(): void {
        this.canShowPlayerInviteDig = true;
    }

    filterPlayer2Suggestions(event: any): void {

        let suggesitions: KeyValue[] = this.regFormData.player2List;

        if (!event.query || !suggesitions) {
            return;
        }

        let searchStr: string = event.query.toLowerCase();
        let filteredSuggestions: KeyValue[] = suggesitions.filter(keyVal => keyVal.value.toLowerCase().includes(searchStr));
        this.player2Suggesitions = [...filteredSuggestions];
    }

    filterStateSuggestions(event: any): void {
        let suggesitions: string[] = this.regFormData.stateList;

        if (!event.query || !suggesitions) {
            return;
        }

        let searchStr: string = event.query.toLowerCase();
        let filteredSuggestions: string[] = suggesitions.filter(val => val.toLowerCase().includes(searchStr));
        this.stateSuggesitions = [...filteredSuggestions];
    }

    filterFacilityeSuggestions(event: any): void {
        let suggesitions: Facility[] = this.regFormData.facilityList;

        if (!event.query || !suggesitions) {
            return;
        }

        let searchStr: string = event.query.toLowerCase();
        let filteredSuggestions: Facility[] = suggesitions.filter(val => val.facilityName.toLowerCase().includes(searchStr));
        this.facilitySuggesition = [...filteredSuggestions];
    }

    handlePlayer2Dropdown(event: any): void {
        this.player2Suggesitions = [...this.regFormData.player2List];
    }

    handleStateDropdown(event: any): void {
        this.stateSuggesitions = [...this.regFormData.stateList];
    }

    handleFacilityDropdown(event: any): void {
        this.facilitySuggesition = [...this.regFormData.facilityList];
    }

    handleSelect(value: any, dropDown: string): void {
        console.log(`Dropdon: ${dropDown}, Selected value: ${value}`);
        if (dropDown === 'PLAYER2') {
            this.canShowFields = true;
            this.regReqModel.player2Id = value.key;
        } else if (dropDown === 'STATE') {
            this.loadFacilities(value);
        } else if (dropDown === 'FACILITY') {
            this.regReqModel.facilityId = value.id;
        }
    }

    submitForm() {
        this.registerForm.nativeElement.submit();
    }

    showMessage(type: string, summary: string, detailMsg: string): void {
        this.msgs = [];
        this.msgs.push({ severity: type, summary: summary, detail: detailMsg });
    }
}