import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthService } from '@shared/services';

@Component({ templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        if (this.authService.userValue) this.router.navigate(['/']);
    }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    get f() { return this.forgotPasswordForm.controls }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.forgotPasswordForm.invalid) return;

        this.loading = true;
        
        this.authService.forgotPassword(this.f.email.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.info(res.data.message, { autoClose: true });
                    this.forgotPasswordForm.reset();
                    this.loading = false;
                    this.submitted = false;
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                    this.submitted = false;
                }
            );
    }
}