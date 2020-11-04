import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { Group } from '../models';

@Injectable({ providedIn: 'root' })
export class GroupsService {

    constructor(
        private http: HttpClient
    ) { }

    getActiveGroups() {
        return this.http.get<any>(`${environment.apiUrl}/groups/active`);
    }

    getOpenGroups() {
        return this.http.get<any>(`${environment.apiUrl}/groups/open`);
    }

    createGroup(group: Group) {
        return this.http.post<any>(`${environment.apiUrl}/groups`, group);
    }

    getGroup(id) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}`);
    }

    getGroupAdditionRequests(id) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/requests`);
    }

    deleteGroup(id) {
        return this.http.delete<any>(`${environment.apiUrl}/groups/${id}`);
    }

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
