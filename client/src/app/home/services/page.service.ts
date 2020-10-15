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

    getNews() {
        return this.http.get<any>(`${environment.apiUrl}/news`);
    }

} 