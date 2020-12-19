import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {

    constructor(private http: HttpClient) { }

    createNews(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/news`, formData);
    }

    getNews() {
        return this.http.get<any>(`${environment.apiUrl}/news`);
    }

    changeVisibility(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_visibility`);
    }

    changeCommentable(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_commentable`);
    }

    changeProtected(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_protected`);
    }

    deleteNews(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/news/${id}`);
    }

    getNewsById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/news/id/${id}`);
    }

    updateNews(id: string, formData: FormData) {
        return this.http.put<any>(`${environment.apiUrl}/news/${id}`, formData);
    }

}