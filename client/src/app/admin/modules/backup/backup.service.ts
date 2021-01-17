import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class BackupService {

    private backupURL: string = `${environment.apiUrl}/backup`;

    constructor(private http: HttpClient) { }

    getBackup() {
        return this.http.get<any>(this.backupURL);
    }

    createBackup() {
        return this.http.get<any>(`${this.backupURL}/create`);
    }

    restoreBackup() {
        return this.http.get<any>(`${this.backupURL}/restore`);
    }
}
