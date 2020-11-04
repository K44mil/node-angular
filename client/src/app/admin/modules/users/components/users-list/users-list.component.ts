import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { User } from '../../models/User';

import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent implements OnInit {
    public users: User[];
    pageNumber = 1;
    itemsPerPage = 10;
    pageOfItems: Array<any>;

    constructor(
        private usersService: UsersService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersService.getUsers()
            .pipe(first())
            .subscribe(res => {
                this.users = res.data.users
            },
            err => {
                this.alertService.error(err);
            });
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    setPageNumber(pageNumber) {
        this.pageNumber = pageNumber;
    }
}