import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';

@Component({ template: 
                        `
                            <admin-nav></admin-nav>       
                            <admin-side-nav></admin-side-nav> 
                        `,
})
export class LayoutComponent {
    constructor(
        private titleService: Title,
        private router: Router,
        private alertService: AlertService
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Admin Panel');
        // this.router.navigate(['/admin/users']);
    }

    showAlert() {
        this.alertService.success('alert');
    }
}