import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilesService {

    constructor(private http: HttpClient) { }

    getFiles() {
        return this.http.get<any>(`${environment.apiUrl}/files`);
    }

    deleteFile(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/files/${id}`);
    }

    downloadFile(id: string): any {
        return this.http.get(`${environment.apiUrl}/files/download/${id}`, { responseType: 'blob' });
    }

    uploadFile(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/files/upload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
        // .pipe(map((event) => {
        //     switch (event.type) {
        //         case HttpEventType.UploadProgress:
        //             const progress = Math.round(100 * event.loaded / event.total);
        //             return { status: 'progress', message: progress };  
        //         case HttpEventType.Response:
        //             return event.body;
        //     }
        // }));
    }
}