import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class GroupsService {

    constructor(
        private http: HttpClient
    ) { }

    getVisibleUniversities() {
        return this.http.get<any>(`${environment.apiUrl}/universities/visible`);
    }

    getVisibleFaculties() {
        return this.http.get<any>(`${environment.apiUrl}/faculties/visible`);
    }

    getVisibleDepartments() {
        return this.http.get<any>(`${environment.apiUrl}/departments/visible`);
    }

    getVisibleCourses() {
        return this.http.get<any>(`${environment.apiUrl}/courses/visible`);
    }

    getVisibleSpecializations() {
        return this.http.get<any>(`${environment.apiUrl}/specializations/visible`);
    }

    getVisibleSubjects() {
        return this.http.get<any>(`${environment.apiUrl}/subjects/visible`);
    }
}
