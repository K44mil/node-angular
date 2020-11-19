import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({ templateUrl: 'blocked-users-list.component.html' })
export class BlockedUsersListComponent implements OnInit {
    public users: User[];

    constructor(
        private usersService: UsersService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadBlockedUsers();
    }

    loadBlockedUsers() {
        this.usersService.getBlockedUsers()
            .pipe(first())
            .subscribe(res => this.users = res.data.users);
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }
}