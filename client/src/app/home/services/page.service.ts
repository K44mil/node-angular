import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageService {

    profilePage = new Subject<string>();

    constructor(private http: HttpClient) { }

    getSlider() {
        return this.http.get<any>(`${environment.apiUrl}/slider/visible`);
    }
    
    getAboutPages() {
        return this.http.get<any>(`${environment.apiUrl}/about`);
    }

    getNewsBySlug(slug) {
        return this.http.get<any>(`${environment.apiUrl}/news/${slug}`);
    }

    getAnnouncements() {
        return this.http.get<any>(`${environment.apiUrl}/announcements/visible`);
    }

    getNews(query: string) {
        return this.http.get<any>(`${environment.apiUrl}/news/visible${query}`);
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

    downloadFile(id): any {
        return this.http.get(`${environment.apiUrl}/files/download/${id}`, { responseType: 'blob' });
    }

    deleteComment(id) {
        return this.http.delete<any>(`${environment.apiUrl}/comments/${id}`);
    }

    getCategories() {
        return this.http.get<any>(`${environment.apiUrl}/categories`);
    }
} 