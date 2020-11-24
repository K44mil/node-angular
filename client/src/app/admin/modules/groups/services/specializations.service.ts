import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({ providedIn: 'root' })
export class SpecializationsService {

    constructor(private http: HttpClient) { }

    getSpecializations() {
        return this.http.get<any>(`${environment.apiUrl}/specializations`);
    }
}