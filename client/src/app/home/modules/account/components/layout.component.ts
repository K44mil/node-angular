import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ template: `
            <div>
                <router-outlet></router-outlet>
            </div>
`})
export class LayoutComponent implements OnInit {

    constructor(private router: Router) {
       
    }

    ngOnInit() {
        const splittedUrl = this.router.url.split('/');
        const page = splittedUrl[splittedUrl.length - 1];
        if (page === 'my_profile')
            this.router.navigate(['/account/my_profile/general']);
    }
}