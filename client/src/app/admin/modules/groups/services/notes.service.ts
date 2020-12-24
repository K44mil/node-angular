import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class NotesService {

    constructor(
        private http: HttpClient
    ) { }

    createNote(body: any) {
        return this.http.post<any>(`${environment.apiUrl}/notes`, body);
    }

    updateNote(id: string, body: any) {
        return this.http.put<any>(`${environment.apiUrl}/notes/${id}`, body);
    }

    deleteNote(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/notes/${id}`);
    }
}
