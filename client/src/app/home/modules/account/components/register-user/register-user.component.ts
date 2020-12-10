import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';

import { PasswordConfirmValidator } from '../../validators/PasswordConfirmValidator';

@Component({ templateUrl: 'register-user.component.html' })
export class RegisterUserComponent implements OnInit {
    registrationForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required],
            role: ['user', Validators.required],
            acceptTerms: ['', Validators.requiredTrue],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]]
        },{
            validator: PasswordConfirmValidator('password', 'confirmPassword')
        });
    }

    get f() { return this.registrationForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.registrationForm.invalid) return;

        this.loading = true;
        this.authService.registerUser(this.registrationForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success) {
                        this.alertService.clear();
                        this.alertService.success('Your account has been registered. It has to be verify by Administrator.', {
                            autoClose: true,
                            keepAfterRouteChange: true
                        });
                        this.router.navigate(['/account/login']);
                    } 
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                    this.loading = false;
                }
            );
    }
}