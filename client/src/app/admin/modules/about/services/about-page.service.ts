import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AboutPageService {

    constructor(private http: HttpClient) { }

    getAboutPages() {
        return this.http.get<any>(`${environment.apiUrl}/about`);
    }
    
    getAboutPage(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/about/${id}`);
    }

    updateAboutPage(id: string, body: any) {
        return this.http.put<any>(`${environment.apiUrl}/about/${id}`, body);
    }

    deleteAboutPage(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/about/${id}`);
    }

    createAboutPage(body: any) {
        return this.http.post<any>(`${environment.apiUrl}/about`, body);
    }

    increaseAboutPagePriority(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/about/${id}/increase_priority`);
    }

    decreaseAboutPagePriority(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/about/${id}/decrease_priority`);
    }
}