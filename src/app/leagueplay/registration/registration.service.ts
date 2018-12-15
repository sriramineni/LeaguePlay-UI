import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "src/app/common/appsettings";
import { Observable } from "rxjs";
import { RegistrationFormData, ErrorResponse, Facility } from "./registration.model";

@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) {

    }

    fetchRegFormData(userId: string, league: string): Observable<RegistrationFormData | ErrorResponse> {
        let parms = new HttpParams().set("userId", userId).set("leagueId", league);
        return this
            .http
            .get<RegistrationFormData>(AppSettings.END_POINT + "/leagueplay/loadregformdata", { params: parms });
    }

    fetchFacilities(state: string): Observable<Facility[] | ErrorResponse> {
        let parms = new HttpParams().set("state", state);
        return this
            .http
            .get<Facility[]>(AppSettings.END_POINT + "/leagueplay/loadfacilities", { params: parms });
    }
}