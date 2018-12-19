import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from './registration.service';
import { RegistrationFormData, Facility, ErrorResponse, KeyValue } from './registration.model';

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
    canShowFields: boolean = true;
    canShowPlayerInviteDig: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private registrationService: RegistrationService) {

    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            let userId = params['userId'];
            let leagueId = params['leagueId'];
            this.loadRegistrationFormData(userId, leagueId);
        });
    }

    ngOnDestroy(): void {

    }

    loadRegistrationFormData(userId: string, leagueId: string): void {
        console.log(`User Id: ${userId}, League Id: ${leagueId}`);
        this.registrationService.fetchRegFormData(userId, leagueId).subscribe(response => {
            console.log('Registration form data:', response);
            if (response instanceof ErrorResponse) {
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
        this.registrationService.fetchFacilities(state).subscribe(response => {
            if (response instanceof ErrorResponse) {
                return;
            }
            this.regFormData.facilityList = response;
            this.facilitySuggesition = this.regFormData.facilityList;
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
        } else if (dropDown === 'STATE') {
            this.loadFacilities(value);
        }
    }
}