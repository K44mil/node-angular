import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';
import { PasswordConfirmValidator } from '../../validators/PasswordConfirmValidator';

@Component({ templateUrl: 'reset-password.component.html' })
export class ResetPasswordComponent implements OnInit {
    private resetToken: string;
    resetPasswordForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        if (this.authService.userValue) this.router.navigate(['/']);
        
    }

    ngOnInit() {
        this.resetToken = this.route.snapshot.paramMap.get('resetToken');
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordConfirmValidator('password', 'confirmPassword')
        });
    }

    get f() { return this.resetPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.resetPasswordForm.invalid) return;

        this.loading = true;
        this.authService.resetPassword(this.f.password.value, this.f.confirmPassword.value, this.resetToken)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success(res.data.message, { autoClose: true });
                    this.loading = false;
                    this.submitted = false;
                    this.resetPasswordForm.reset();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    this.loading = false;
                    this.submitted = false;
                }
            );
    }
}