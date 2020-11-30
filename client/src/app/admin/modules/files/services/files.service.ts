import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class FilesService {

    constructor(private http: HttpClient) { }

    getFiles() {
        return this.http.get<any>(`${environment.apiUrl}/files`);
    }

}