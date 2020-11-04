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

    changeVisibility(id) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_visibility`);
    }

    changeCommentable(id) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_commentable`);
    }

    changeProtected(id) {
        return this.http.get<any>(`${environment.apiUrl}/news/${id}/change_protected`);
    }

    getCategories() {
        return this.http.get<any>(`${environment.apiUrl}/categories`);
    }

}