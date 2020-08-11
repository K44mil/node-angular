import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/services';
import { AuthUser } from '@app/models';

@Component({
    selector: 'main-nav',
    templateUrl: 'main-nav.component.html',
    styleUrls: ['main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

    loggedUser: AuthUser;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.user
            .subscribe(loggedUser => this.loggedUser = loggedUser);
    }

    logout() {
        this.authService.logout();
    }
}