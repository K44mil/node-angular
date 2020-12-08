import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {

    private usersUrl: string = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    createUser(body: any) {
        return this.http.post<any>(`${this.usersUrl}`, body);
    }

    getUsers(query: string) {
        return this.http.get<any>(`${this.usersUrl}${query}`);
    }

    getUser(id: string) {
        return this.http.get<any>(`${this.usersUrl}/${id}`);
    }

    updateUser(id: string, body: any) {
        return this.http.put<any>(`${this.usersUrl}/${id}`, body);
    }

    getInactiveUsers() {
        return this.http.get<any>(`${this.usersUrl}?isVerified=0`);
    }

    getBlockedUsers() {
        return this.http.get<any>(`${this.usersUrl}?isBlocked=1`);
    }

    activateUser(id: string) {
        return this.http.get<any>(`${this.usersUrl}/verify/${id}`);
    }

    blockUser(id: string) {
        return this.http.get<any>(`${this.usersUrl}/block/${id}`);
    }

    unblockUser(id: string) {
        return this.http.get<any>(`${this.usersUrl}/unblock/${id}`);
    }

    deleteUser(id: string) {
        return this.http.delete<any>(`${this.usersUrl}/${id}`);
    }

    deleteManyUsers(ids: string[]) {
        return this.http.post<any>(`${this.usersUrl}/delete_many`, { ids });
    }

    blockManyUsers(ids: string[]) {
        return this.http.post<any>(`${this.usersUrl}/block_many`, { ids });
    }

    activateManyUsers(ids: string[]) {
        return this.http.post<any>(`${this.usersUrl}/activate_many`, { ids });
    }

    unblockManyUsers(ids: string[]) {
        return this.http.post<any>(`${this.usersUrl}/unblock_many`, { ids });
    }
}
