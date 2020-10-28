import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Announcement } from '../models/Announcement';

@Injectable({ providedIn: 'root' })
export class AnnouncementsService {

    constructor(private http: HttpClient) { }

    getAnnouncements() {
        return this.http.get<any>(`${environment.apiUrl}/announcements`);
    }

    createAnnouncement(announcement: Announcement) {
        return this.http.post<any>(`${environment.apiUrl}/announcements`, announcement);
    }

    deleteAnnouncement(id) {
        return this.http.delete<any>(`${environment.apiUrl}/announcements/${id}`);
    }
}