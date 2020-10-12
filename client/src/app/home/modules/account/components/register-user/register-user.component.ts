import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';

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
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['user', Validators.required],
            acceptTerms: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
    }

    get f() { return this.registrationForm.controls }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.registrationForm.invalid) return;

        this.loading = true;
        this.authService.register(this.registrationForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful. [ ADMIN MUSI POTWIERDZIĆ ].', { keepAfterRouteChange: true });
                    this.router.navigate(['/account/login']);
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            );
    }
}