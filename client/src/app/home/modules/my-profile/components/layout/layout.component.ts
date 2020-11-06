import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'layout.component.html',
    styles: [
        `
            a.nav-link {
                cursor: pointer;
                color: #303030;
            }
            .active {
                background: #303030 !important;
            }
        `
    ]
})
export class LayoutComponent {
    
    constructor(private router: Router) {
        // this.router.navigate(['/account/my_profile/general']);
    }
}