import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class PageService {

    constructor(private http: HttpClient) { }

    getAboutPages() {
        return this.http.get<any>(`${environment.apiUrl}/about`);
    }

    getNewsBySlug(slug) {
        return this.http.get<any>(`${environment.apiUrl}/news/${slug}`);
    }

    getAnnouncements() {
        return this.http.get<any>(`${environment.apiUrl}/announcements/visible`);
    }

    getNews() {
        return this.http.get<any>(`${environment.apiUrl}/news/visible`);
    }

    addComment(newsId, content) {
        return this.http.post<any>(`${environment.apiUrl}/comments/news/${newsId}`, { content });
    }

    getComments(newsId) {
        return this.http.get<any>(`${environment.apiUrl}/comments/news/${newsId}`);
    }

    getContact() {
        return this.http.get<any>(`${environment.apiUrl}/contact`);
    }

} 