import { Component, OnInit } from '@angular/core';

import { AuthService, AlertService } from '@shared/services';
import { AuthUser, Role } from '@home/modules/account/models';

@Component({
    selector: 'admin-nav',
    templateUrl: 'admin-nav.component.html'
})
export class AdminNavComponent implements OnInit {

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
    
}