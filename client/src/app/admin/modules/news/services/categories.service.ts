import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get<any>(`${environment.apiUrl}/categories`);
    }

    getCategory(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/categories/${id}`);
    }

    deleteCategory(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/categories/${id}`);
    }

    createCategory(body: any) {
        return this.http.post<any>(`${environment.apiUrl}/categories`, body);
    }

    updateCategory(id: string, body: any) {
        return this.http.put<any>(`${environment.apiUrl}/categories/${id}`, body);
    }
}