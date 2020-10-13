import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {

    private usersUrl: string = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<any>(this.usersUrl);
    }

}
