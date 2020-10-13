import { Component } from '@angular/core';

@Component({
    selector: 'admin-side-nav',
    templateUrl: 'admin-side-nav.component.html',
    styles: [
        `
            .wrapper {
                display: flex;
                width: 100%;
                align-items: stretch;
            }

            #sidebar {
                min-width: 250px;
                max-width: 250px;
                min-height: calc(100vh - 64px);
                background: #495057;
                color: #fff;
                transition: all 0.3s;
            }
   
            a, a:hover, a:focus {
                color: inherit;
                text-decoration: none;
                transition: all 0.3s;
            }
            
            #sidebar ul.components {
                padding: 20px 0;
            }
            
            #sidebar ul li a {
                padding: 10px;
                font-size: 1.1em;
                display: block;
            }

            #sidebar ul li a:hover {
                color: #fff;
                background: #868e96;
            }
            
            ul ul a {
                font-size: 0.9em !important;
                padding-left: 30px !important;
                background: #6d7fcc;
            }
        `
    ]
})
export class AdminSideNavComponent { }