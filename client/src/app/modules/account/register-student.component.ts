import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, AlertService } from '@app/services';

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
            albumNumber: ['', Validators.required]
        });
    }

    get f() { return this.registrationForm.controls }

    onSubmit() {
        
    }
}