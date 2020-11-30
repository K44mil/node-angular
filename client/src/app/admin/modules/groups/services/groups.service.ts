import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { Group } from '../models';

@Injectable({ providedIn: 'root' })
export class GroupsService {

    constructor(
        private http: HttpClient
    ) { }

    getGroups(query: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups${query}`);
    }

    openGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/open`);
    }

    openManyGroups(ids: string[]) {
        return this.http.post<any>(`${environment.apiUrl}/groups/open_many`, { ids });
    }

    closeManyGroups(ids: string[]) {
        return this.http.post<any>(`${environment.apiUrl}/groups/close_many`, { ids });
    }

    addUsersToGroup(id: string, ids: string[]) {
        return this.http.post<any>(`${environment.apiUrl}/groups/${id}/add_members`, { ids });
    }

    closeGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/close`);
    }

    archiveGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/archive`);
    }

    restoreGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/restore`);
    }

    getOpenGroups() {
        return this.http.get<any>(`${environment.apiUrl}/groups/open`);
    }

    createGroup(group: Group) {
        return this.http.post<any>(`${environment.apiUrl}/groups`, group);
    }

    editGroup(id: string, group: Group) {
        return this.http.put<any>(`${environment.apiUrl}/groups/${id}`, group);
    }

    getGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}`);
    }

    getGroupAdditionRequests(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/requests`);
    }

    acceptAdditionRequest(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/request/${id}/accept`);
    }

    rejectAdditionRequest(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/request/${id}/reject`);
    }

    getGroupAttendance(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/attendance`);
    }

    getGroupMarks(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/marks`);
    }

    getGroupMembers(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/${id}/members`);
    }

    removeUserFromGroup(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/groups/members/${id}/remove`);
    }

    deleteGroup(id: string) {
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

    // GROUP EVENTS
    createEvent(body) {
        return this.http.post<any>(`${environment.apiUrl}/events/`, body);
    }

    getEvents(id) {
        return this.http.get<any>(`${environment.apiUrl}/events/group/${id}`);
    }

    deleteEvent(id) {
        return this.http.delete<any>(`${environment.apiUrl}/events/${id}`);
    }

    updateEvent(id, body) {
        return this.http.put<any>(`${environment.apiUrl}/events/${id}`, body);
    }

    openEvent(id) {
        return this.http.get<any>(`${environment.apiUrl}/events/${id}/open`);
    }

    closeEvent(id) {
        return this.http.get<any>(`${environment.apiUrl}/events/${id}/close`);
    }

    // User groups list
    getMyGroups() {
        return this.http.get<any>(`${environment.apiUrl}/groups/my_groups`);
    }

    // User group info
    getMyGroupDetails(id) {
        return this.http.get<any>(`${environment.apiUrl}/groups/my_groups/${id}/details`);
    }

    // Confirm Presence
    confirmPresence(id) {
        return this.http.get<any>(`${environment.apiUrl}/presences/${id}/confirm`);
    }

    // Change Presence for Admin
    setPresence(id: string, isPresent: boolean) {
        if (isPresent)
            return this.http.get<any>(`${environment.apiUrl}/presences/${id}/present`);
        return this.http.get<any>(`${environment.apiUrl}/presences/${id}/absent`);
    }

    getPresence(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/presences/${id}`);
    }

    // Create Mark
    createMarks(id: string, body: any) {
        return this.http.post<any>(`${environment.apiUrl}/marks/group/${id}`, body);
    }

    // Get Mark
    getMark(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/marks/${id}`);
    }

    deleteMark(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/marks/${id}`);
    }

    updateMark(id: string, body: any) {
        return this.http.put<any>(`${environment.apiUrl}/marks/${id}`, body);
    }

    getMyMarks(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/marks/group/${id}`);
    }
}
