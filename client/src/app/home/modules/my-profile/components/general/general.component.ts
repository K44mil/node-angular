import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/admin/modules/users/models/User';
import { AuthUser } from '@app/home/modules/account/models';
import { AlertService, AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'general.component.html'
})
export class GeneralComponent implements OnInit {
    loggedUser: AuthUser;
    user: User; 

    changeAvatarForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
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
        
        // CHANGE AVATAR FORM
        this.changeAvatarForm = this.formBuilder.group({
            avatar: ['', Validators.required]
        });
    }

    getUserName() {
        if (this.user)
            return `${this.user.firstName} ${this.user.lastName}`;
        else
            return '';
    }

    getPhotoUrl() {
        if (this.user && this.user.avatar)
            return `http://localhost:5000/uploads/avatars/${this.user.avatar}`;
        return null;
    }
    
    onChangeAvatarFormSubmit() {
        console.log('hello');
        
        if (this.changeAvatarForm.invalid) return;
        
        const formData = new FormData();
        formData.append('avatar', this.changeAvatarForm.get('avatar').value);

        this.authService.changeAvatar(formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.user = res.data.user;
                },
                err => {
                    this.alertService.error(err);
                }
            );

        this.changeAvatarForm.reset();
    }
}                                                    