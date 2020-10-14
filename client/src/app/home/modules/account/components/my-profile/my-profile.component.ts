import { Component, OnInit } from '@angular/core';
import { User } from '@app/admin/modules/users/models/User';
import { AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';

@Component({ templateUrl: 'my-profile.component.html' })
export class MyProfileComponent implements OnInit {
    user: User;

    constructor(
        private authService: AuthService,
        private titleService: Title
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - My Profile');
    }

    ngOnInit() {
        this.authService.getMe()
            .pipe(first())
            .subscribe(
                res => this.user = res.data.user
            );
    }
}