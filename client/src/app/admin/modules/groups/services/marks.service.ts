import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class MarksService {

    constructor(private http: HttpClient) { }

    getMarkDescriptions() {
        return this.http.get<any>(`${environment.apiUrl}/marks/descriptions`);
    }

    getMarkDescription(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/marks/descriptions/${id}`);
    }

    createMarkDescription(body: any) {
        return this.http.post<any>(`${environment.apiUrl}/marks/descriptions`, body);
    }

    deleteMarkDescription(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/marks/descriptions/${id}`);
    }

    updateMarkDescription(id: string, body: any) {
        return this.http.put<any>(`${environment.apiUrl}/marks/descriptions/${id}`, body);
    }

}