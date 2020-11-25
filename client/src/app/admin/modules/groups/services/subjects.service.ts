import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Subject } from '../models';

@Injectable({ providedIn: 'root' })
export class SubjectsService {

    constructor(private http: HttpClient) { }

    getSubjects() {
        return this.http.get<any>(`${environment.apiUrl}/subjects`);
    }

    getSubject(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/subjects/${id}`);
    }

    createSubject(subject: Subject) {
        return this.http.post<any>(`${environment.apiUrl}/subjects`, subject);
    }

    updateSubject(id: string, subject: Subject) {
        return this.http.put<any>(`${environment.apiUrl}/subjects/${id}`, subject);
    }

    deleteSubject(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/subjects/${id}`);
    }
}