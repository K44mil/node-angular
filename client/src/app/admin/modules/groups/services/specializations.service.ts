import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Specialization } from '../models';


@Injectable({ providedIn: 'root' })
export class SpecializationsService {

    constructor(private http: HttpClient) { }

    getSpecializations() {
        return this.http.get<any>(`${environment.apiUrl}/specializations`);
    }

    getSpecialization(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/specializations/${id}`);
    }

    createSpecialization(spec: Specialization) {
        return this.http.post<any>(`${environment.apiUrl}/specializations`, spec);
    }

    updateSpecialization(id: string, spec: Specialization) {
        return this.http.put<any>(`${environment.apiUrl}/specializations/${id}`, spec);
    }

    deleteSpecialization(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/specializations/${id}`);
    }
}