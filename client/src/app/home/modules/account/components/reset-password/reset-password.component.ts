import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService, AlertService } from '@shared/services';

@Component({ templateUrl: 'reset-password.component.html' })
export class ResetPasswordComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        if (this.authService.userValue) this.router.navigate(['/']);
    }

    ngOnInit() { }
}