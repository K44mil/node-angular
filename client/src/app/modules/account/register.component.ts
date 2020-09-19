import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        if (this.authService.userValue) this.router.navigate(['/']);
    }

    ngOnInit() { }
}