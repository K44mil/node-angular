import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthUser, RegisterUserRequest } from '@home/modules/account/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<AuthUser>;
    public user: Observable<AuthUser>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) user = JSON.parse(sessionStorage.getItem('user'));
        this.userSubject = new BehaviorSubject<AuthUser>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): AuthUser {
        return this.userSubject.value;
    }

    register(registerUserRequest: RegisterUserRequest) {
        return this.http.post<any>(`${environment.apiUrl}/auth/register_user`, registerUserRequest);
    }

    loginAndRemember(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(res => {
                if (res.data && res.data.user && res.data.token) {
                    const user: AuthUser = {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        role: res.data.user.role,
                        token: res.data.token
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }
            }));
    }

    login(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(res => {
                if (res.data && res.data.user && res.data.token) {
                    const user: AuthUser = {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        role: res.data.user.role,
                        token: res.data.token
                    };
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }
            }));
    }

    forgotPassword(email) {
        return this.http.post<any>(`${environment.apiUrl}/auth/forgot_password`, { email });
    }

    resetPassword(password, confirmPassword, resetToken) {
        return this.http.put<any>(`${environment.apiUrl}/auth/reset_password/${resetToken}`, { password, confirmPassword });
    }

    getMe() {
        return this.http.get<any>(`${environment.apiUrl}/auth/me`);
    }

    logout() {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    changeAvatar(formData: FormData) {
        return this.http.put<any>(`${environment.apiUrl}/auth/change_avatar`, formData);
    }
  
}
