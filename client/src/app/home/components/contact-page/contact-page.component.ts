import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'contact-page.component.html',
    styles: [
        `
            h4 a {
                text-decoration: none;
                color: black;
            }

            h6 a {
                text-decoration: none;
                color: black;
            }

            .img-social {
                width: 150px;
                height: 150px;
            }

            table tbody tr td {
                padding: 10px;
            }

        `
    ]
})
export class ContactPageComponent implements OnInit {

    ngOnInit() {
        
    }
}