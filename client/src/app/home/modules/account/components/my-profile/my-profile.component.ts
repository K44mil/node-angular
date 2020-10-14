import { Component, OnInit } from '@angular/core';
import { User } from '@app/admin/modules/users/models/User';
import { AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'my-profile.component.html' })
export class MyProfileComponent implements OnInit {
    user: User;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.getMe()
            .pipe(first())
            .subscribe(
                res => this.user = res.data.user
            );
    }
}