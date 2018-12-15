
export class ErrorResponse {
    code: string;
    message: string;
}

export class RegistrationFormData {
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