import { Component, OnInit } from '@angular/core';

import { AuthService, AlertService } from '@shared/services';
import { AuthUser, Role } from '@home/modules/account/models';

@Component({
    selector: 'main-nav',
    templateUrl: 'main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    loggedUser: AuthUser;

    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.authService.user
            .subscribe(loggedUser => this.loggedUser = loggedUser);
    }

    logout() {
        this.authService.logout();
        this.alertService.info('Logout successful.', {
            autoClose: true
        });
    }

    isAdmin() {
        return this.loggedUser.role === Role.Admin ? true : false;
    }

    getUserName() {
        if (this.loggedUser)
            return this.loggedUser.firstName + ' ' + this.loggedUser.lastName;
        else
            return '';
    }

    getPhotoUrl() {
        // return 'http://localhost:5000/uploads/news/no-news-photo.jpg';
        return '';
    }
}