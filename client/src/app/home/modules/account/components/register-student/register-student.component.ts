import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, AlertService } from '@shared/services';
import { first } from 'rxjs/operators';

import { PasswordConfirmValidator } from '../../validators/PasswordConfirmValidator';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: 'register-student.component.html' })
export class RegisterStudentComponent implements OnInit {
    registrationForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private titleService: Title
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Register Student');
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required],
            role: ['student', Validators.required],
            acceptTerms: ['', Validators.requiredTrue],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            albumNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
            groupId: ['']
        }, {
            validator: PasswordConfirmValidator('password', 'confirmPassword')
        });
    }

    get f() { return this.registrationForm.controls }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.registrationForm.invalid) return;

        this.loading = true;
        this.authService.registerStudent(this.registrationForm.value)
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
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    window.scrollTo(0,0);
                    this.loading = false;
                }
            );
    }

    onGroupFinderChanged(event) {
        this.registrationForm.patchValue({
            groupId: event
        });
    }
}