import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, AlertService } from '@shared/services';
import { first } from 'rxjs/operators';

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
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['student', Validators.required],
            acceptTerms: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            albumNumber: ['', Validators.required],
            groupId: ['', Validators.required]
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