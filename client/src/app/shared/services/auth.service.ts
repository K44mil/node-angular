import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthUser, RegisterStudentRequest, RegisterUserRequest } from '@home/modules/account/models';
import { CryptService } from '@shared/services/crypt.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<AuthUser>;
    public user: Observable<AuthUser>;

    public admin: boolean = false;

    constructor(
        private router: Router,
        private http: HttpClient,
        private cryptService: CryptService
    ) {
        let user = this.loadUserValueFromLocalStorage();
        if (!user) user = this.loadUserValueFromSessionStorage();

        if (!user) {
            this.clearSessionStorage();
            this.clearLocalStorage();
        }

        this.userSubject = new BehaviorSubject<AuthUser>(user);
        this.user = this.userSubject.asObservable();
    }

    private loadUserValueFromLocalStorage(): AuthUser {
        let user: AuthUser = null;
        let userString = this.cryptService.decrypt(localStorage.getItem('_u'));
        try {
            user = JSON.parse(userString);
        } catch (err) { }
        return user;
    }

    private loadUserValueFromSessionStorage(): AuthUser {
        let user: AuthUser = null;
        let userString = this.cryptService.decrypt(sessionStorage.getItem('_u'));
        try {
            user = JSON.parse(userString);
        } catch (err) { }
        return user;
    }

    private saveUserValueToLocalStorage(): void {
        const encryptedUserString = this.cryptService.encrypt(JSON.stringify(this.userValue));
        localStorage.setItem('_u', encryptedUserString);
    }

    private saveUserValueToSessionStorage(): void {
        const encryptedUserString = this.cryptService.encrypt(JSON.stringify(this.userValue));
        sessionStorage.setItem('_u', encryptedUserString);
    }

    public saveUserValue(): void {
        this.saveUserValueToLocalStorage();
    }

    public get userValue(): AuthUser {
        return this.userSubject.value;
    }

    public isAdmin() {
        return this.http.get<any>(`${environment.apiUrl}/auth/admin`);
    }

    public registerUser(registerUserRequest: RegisterUserRequest) {
        return this.http.post<any>(`${environment.apiUrl}/auth/register_user`, registerUserRequest);
    }

    public registerStudent(registerStudentRequest: RegisterStudentRequest) {
        return this.http.post<any>(`${environment.apiUrl}/auth/register_student`, registerStudentRequest);
    }

    public loginAndRemember(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(res => {
                if (res.data && res.data.user && res.data.token) {
                    const user: AuthUser = {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        avatar: res.data.user.avatar,
                        role: res.data.user.role,
                        token: res.data.token
                    };
                    this.userSubject.next(user);
                    this.saveUserValueToLocalStorage();
                    return user;
                }
            }));
    }

    public login(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(res => {
                if (res.data && res.data.user && res.data.token) {
                    const user: AuthUser = {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        avatar: res.data.user.avatar,
                        role: res.data.user.role,
                        token: res.data.token
                    };
                    this.userSubject.next(user);
                    this.saveUserValueToSessionStorage();
                    return user;
                }
            }));
    }

    public forgotPassword(email) {
        return this.http.post<any>(`${environment.apiUrl}/auth/forgot_password`, { email });
    }

    public resetPassword(password, confirmPassword, resetToken) {
        return this.http.put<any>(`${environment.apiUrl}/auth/reset_password/${resetToken}`, { password, confirmPassword });
    }

    public getMe() {
        return this.http.get<any>(`${environment.apiUrl}/auth/me`);
    }

    private clearLocalStorage(): void {
        localStorage.removeItem('_u');
    }

    private clearSessionStorage(): void {
        sessionStorage.removeItem('_u');
    }

    public logout() {
        this.clearSessionStorage();
        this.clearLocalStorage();
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    public changeAvatar(formData: FormData) {
        return this.http.put<any>(`${environment.apiUrl}/auth/change_avatar`, formData);
    }
}
