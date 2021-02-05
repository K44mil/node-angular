import { Component, OnInit } from '@angular/core';

import { AuthService, AlertService } from '@shared/services';
import { AuthUser, Role } from '@home/modules/account/models';

import { environment } from '@env/environment';
import { first } from 'rxjs/operators';
import { PageService } from '@app/home/services';

@Component({
    selector: 'main-nav',
    templateUrl: 'main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    loggedUser: AuthUser;
    
    constructor(
        private authService: AuthService,
        private pageService: PageService
    ) { }

    ngOnInit() {
        this.authService.user
            .subscribe(loggedUser => this.loggedUser = loggedUser);
    }

    logout() {
        this.authService.logout()
            .pipe(first())
            .subscribe(
                res => {
                    this.pageService.loggedOut.next(true);
                },
                err => {

                }
            )
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
        if (this.loggedUser && this.loggedUser.avatar)
            return `${environment.serverUrl}/uploads/avatars/${this.loggedUser.avatar}`;
        return null;
    }
}