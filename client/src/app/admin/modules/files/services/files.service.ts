import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class FilesService {

    constructor(private http: HttpClient) { }

    getFiles(query: string) {
        return this.http.get<any>(`${environment.apiUrl}/files${query}`);
    }

    deleteFile(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/files/${id}`);
    }

    downloadFile(id: string): any {
        return this.http.get(`${environment.apiUrl}/files/download/${id}`, { responseType: 'blob' });
    }

    backupMySql(): any {
        return this.http.get(`${environment.apiUrl}/files/backup/mysql`, { responseType: 'blob' });
    }

    uploadFile(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/files/upload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
}