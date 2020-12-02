import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {

    constructor(private http: HttpClient) { }

    getContact() {
        return this.http.get<any>(`${environment.apiUrl}/contact`);
    }

    updateContact(body: any) {
        return this.http.put<any>(`${environment.apiUrl}/contact`, body);
    }

}