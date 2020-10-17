import { Component } from '@angular/core';

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
export class LayoutComponent { }