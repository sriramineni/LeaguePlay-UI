
export class ErrorResponse {
    code: string;
    message: string;
}

export class RegistrationFormData {
    leagueInfo: LeagueInformation;
    player1Name: string;
    player2List: KeyValue[];
    stateList: string[]
    facilityList: Facility[];
}

export class KeyValue {
    key: string;
    value: string;
}

export class Facility {
    id: number;
    facilityName: string;
    active: boolean;
    address: string;
    city: string
    county: string
    region: string;
    state: string;
    zip: string;
}

export class LeagueInformation{
    leagueId: number;
    leagueName: string;
    regionId: string;
    leagueSeason: string;
    leagueType: string;
    leagueAge: string;
    leagueCost: number;
    leagueYear: number;
}

export class RegistrationRequestModel{
    userId: number;
    leagueId: number;
    state: string;
    player2Id: string;
    facilityId: string;
    player2Email: string;
}

export class RegistrationResponseModel {
    result: boolean;
    message: string;
}