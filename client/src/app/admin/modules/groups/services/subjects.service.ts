import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({ providedIn: 'root' })
export class SubjectsService {

    constructor(private http: HttpClient) { }

    getSubjects() {
        return this.http.get<any>(`${environment.apiUrl}/subjects`);
    }
}