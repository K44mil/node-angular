import { Component, OnInit } from '@angular/core';
import { User } from '@app/admin/modules/users/models/User';
import { AuthUser } from '@app/home/modules/account/models';
import { AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'general.component.html',
    styles: [
        `
            .user-name: {
                background: red !important;
            }
        `
    ]
})
export class GeneralComponent implements OnInit {

    loggedUser: AuthUser;
    user: User;

    isAvatarFormVisible: boolean = false;
    isEditDataFromVisible: boolean = false;

    constructor(
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        this.loggedUser = this.authService.userValue;
        this.authService.getMe()
            .pipe(first())
            .subscribe(res => {
                if (res.data.user)
                    this.user = res.data.user;
            });
    }

    getUserName() {
        if (this.user)
            return `${this.user.firstName} ${this.user.lastName}`;
        else
            return '';
    }

    showAvatarForm() {
        if (this.isAvatarFormVisible)
            this.isAvatarFormVisible = false;
        else
            this.isAvatarFormVisible = true;

        this.isEditDataFromVisible = false;
    }

    showEditDataForm() {
        if (this.isEditDataFromVisible)
            this.isEditDataFromVisible = false;
        else
            this.isEditDataFromVisible = true;
        
        this.isAvatarFormVisible = false;
    }
}