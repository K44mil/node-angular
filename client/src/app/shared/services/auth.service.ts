import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthUser, RegisterStudentRequest, RegisterUserRequest } from '@home/modules/account/models';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<AuthUser>;
    public user: Observable<AuthUser>;

    public admin: boolean = false;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService
    ) {
        this.userSubject = new BehaviorSubject<AuthUser>(null);
        this.user = this.userSubject.asObservable();
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

    public login(email, password, remember) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password, remember })
            .pipe(map(res => {
                if (res.data && res.data.user) {
                    const resUser = res.data.user;
                    const user: AuthUser = {
                        id: resUser.id,
                        firstName: resUser.firstName,
                        lastName: resUser.lastName,
                        avatar: resUser.avatar,
                        role: resUser.role
                    };
                    this.userSubject.next(user);
                    return user;
                }
            }));
    }

    public isLogged() {
        return this.http.get<any>(`${environment.apiUrl}/auth/me`)
            .pipe(map(res => {
                if (res.data && res.data.user) {
                    const resUser = res.data.user;
                    const user: AuthUser = {
                        id: resUser.id,
                        firstName: resUser.firstName,
                        lastName: resUser.lastName,
                        avatar: resUser.avatar,
                        role: resUser.role
                    };
                    this.userSubject.next(user);
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

    public changeAvatar(formData: FormData) {
        return this.http.put<any>(`${environment.apiUrl}/auth/change_avatar`, formData);
    }

    public changeUserData(body: any) {
        return this.http.put<any>(`${environment.apiUrl}/auth/me`, body);
    }

    public changePassword(body: any) {
        return this.http.put<any>(`${environment.apiUrl}/auth/change_password`, body);
    }

    public deleteAvatar() {
        return this.http.get<any>(`${environment.apiUrl}/auth/delete_avatar`);
    }

    public logout() {
        return this.http.get<any>(`${environment.apiUrl}/auth/logout`)
            .pipe(map(res => {
                this.router.navigate(['/']);
                this.userSubject.next(null);
                setTimeout(() => {
                    this.alertService.clear();
                    this.alertService.info('You have been logged out.', { autoClose: true });
                }, 100);    
            }));
    }
}