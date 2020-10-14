import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';

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
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
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
                    this.loading = false;
                    this.resetPasswordForm.reset();
                    this.alertService.success(res.data.message);

                },
                err => {
                    this.loading = false;
                    this.alertService.error(err);
                }
            );
    }
}