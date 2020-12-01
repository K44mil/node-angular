import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AboutPageService {

    constructor(private http: HttpClient) { }

    getAboutPages() {
        return this.http.get<any>(`${environment.apiUrl}/about`);
    }

    deleteAboutPage(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/about/${id}`);
    }

}