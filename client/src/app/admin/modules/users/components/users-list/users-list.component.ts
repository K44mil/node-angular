import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/User';

import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent implements OnInit {

    public users: User[];

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersService.getUsers()
            .pipe(first())
            .subscribe(res => this.users = res.data.users);
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }
}