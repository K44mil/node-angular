import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmValidator } from '@app/home/modules/account/validators/PasswordConfirmValidator';
import { PageService } from '@app/home/services';
import { AlertService, AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'security.component.html',
})
export class SecurityComponent implements OnInit {
    submitted: boolean = false;
    changePasswordForm: FormGroup;
    changePasswordLoading: boolean = false;

    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private pageService: PageService
    ) { }

    ngOnInit() {
        this.pageService.profilePage.next('security');

        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordConfirmValidator('password', 'confirmPassword')
        });
    }

    get f() { return this.changePasswordForm.controls; }

    onChangePasswordFormSubmit() {
        this.submitted = true;
        if (this.changePasswordForm.invalid) return;

        this.changePasswordLoading = true;

        this.authService.changePassword(this.changePasswordForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success) {
                        this.alertService.success('Password has been changed.', {
                            autoClose: true
                        });
                    }
                    this.changePasswordForm.reset();
                    this.changePasswordLoading = false;
                    this.submitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.submitted = false;
                    this.changePasswordLoading = false;
                    window.scrollTo(0,0);
                }
            )
    }
}