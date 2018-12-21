import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "src/app/common/appsettings";
import { Observable } from "rxjs";
import { RegistrationFormData, ErrorResponse, Facility, RegistrationRequestModel, RegistrationResponseModel } from "./registration.model";

@Injectable()
export class RegistrationService {

    regReqModel: RegistrationRequestModel = new RegistrationRequestModel();

    constructor(private http: HttpClient) {

    }

    fetchRegFormData(): Observable<RegistrationFormData | ErrorResponse> {
        return this
            .http
            .post<RegistrationFormData>(AppSettings.END_POINT + "/loadregformdata", this.regReqModel);
    }

    fetchFacilities(): Observable<Facility[] | ErrorResponse> {
        return this
            .http
            .post<Facility[]>(AppSettings.END_POINT + "/loadfacilities", this.regReqModel);
    }

    sendEmailInvite(): Observable<RegistrationResponseModel | ErrorResponse> {
        return this
            .http
            .post<RegistrationResponseModel>(AppSettings.END_POINT + "/sendplayerinvite", this.regReqModel);
    }
}