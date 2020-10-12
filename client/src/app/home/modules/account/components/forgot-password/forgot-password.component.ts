import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { AuthService } from '@shared/services';

@Component({ templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        if (this.authService.userValue) this.router.navigate(['/']);
    }

    ngOnInit() { }
}