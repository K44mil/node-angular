import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/admin/modules/users/models/User';
import { AuthUser } from '@app/home/modules/account/models';
import { AlertService, AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ReturnStatement } from '@angular/compiler';
import { PageService } from '@app/home/services';

@Component({
    templateUrl: 'general.component.html'
})
export class GeneralComponent implements OnInit {
    loggedUser: AuthUser;
    user: User; 

    changeAvatarFormLoading = false;
    changeAvatarForm: FormGroup;

    editUserDataFormLoading: boolean = false;
    editUserDataForm: FormGroup;

    editDataFormSubmitted: boolean = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private pageService: PageService
    ) {

    }

    ngOnInit() {
        this.loggedUser = this.authService.userValue;

        this.pageService.profilePage.next('general');

        this.authService.getMe()
            .pipe(first())
            .subscribe(res => {
                if (res.data.user)
                    this.user = res.data.user;
            });
        
        // CHANGE AVATAR FORM
        this.changeAvatarForm = this.formBuilder.group({
            avatar: ['', Validators.required],
            avatarSource: ['', Validators.required]
        });

        // EDIT USER DATA FORM
        this.editUserDataForm = this.formBuilder.group({
            // firstName: ['', [Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            // lastName: ['', [Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]]
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get f() { return this.editUserDataForm.controls; }

    getUserName() {
        if (this.user)
            return `${this.user.firstName} ${this.user.lastName}`;
        else
            return '';
    }

    getPhotoUrl() {
        if (this.user && this.user.avatar)
            return `${environment.hostUrl}/uploads/avatars/${this.loggedUser.avatar}`;
        return null;
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.changeAvatarForm.patchValue({
                avatarSource: file
            });
        }
    }
    
    onChangeAvatarFormSubmit() {
        if (this.changeAvatarForm.invalid) return;
        
        this.changeAvatarFormLoading = true;
        const formData = new FormData();
        formData.append('avatar', this.changeAvatarForm.get('avatarSource').value);

        this.authService.changeAvatar(formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.user = res.data.user;
                    // const prevAvatar = this.authService.userValue.avatar;
                    // this.authService.userValue.avatar = res.data.user.avatar;
                    // this.authService.saveUserValue();
                    this.changeAvatarFormLoading = false;
                    this.changeAvatarForm.reset();
                    window.location.reload();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.changeAvatarFormLoading = false;
                    this.changeAvatarForm.reset();
                }
            );
    }

    onSubmitEditUserDataForm() {
        this.editDataFormSubmitted = true;
        if (this.editUserDataForm.invalid) return;

        this.authService.changeUserData(this.editUserDataForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.user = res.data.user;
                    // const prevAvatar = this.authService.userValue.avatar;
                    // this.authService.userValue.firstName = this.user.firstName;
                    // this.authService.userValue.lastName = this.user.lastName;
                    this.editDataFormSubmitted = false;
                    window.location.reload();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    deleteAvatar() {
        this.authService.deleteAvatar()
            .pipe(first())
            .subscribe(
                res => {
                    window.location.reload();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }
}                                                    