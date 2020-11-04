import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { User } from '../../models/User';

import { UsersService } from '../../services/users.service';

@Component({
    templateUrl: 'inactive-users-list.component.html'
})
export class InactiveUsersListComponent implements OnInit {
    public users: User[];

    constructor(
        private usersService: UsersService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadInactiveUsers();
    }

    loadInactiveUsers() {
        this.usersService.getInactiveUsers()
            .pipe(first())
            .subscribe(res => this.users = res.data.users);
    }

    activateUserAccount(id) {
        this.usersService.activateUser(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadInactiveUsers();
                },
                err => {
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }
}