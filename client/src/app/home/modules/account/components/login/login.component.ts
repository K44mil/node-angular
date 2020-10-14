import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';

@Component({ templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) { 
        if (this.authService.userValue) this.router.navigate(['/']);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: ['']
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.loginForm.invalid) return;

        this.loading = true;
    
        if (this.f.remember.value === true) {
            this.authService.loginAndRemember(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            );
        } else {
            this.authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            );
        }       
    }
}