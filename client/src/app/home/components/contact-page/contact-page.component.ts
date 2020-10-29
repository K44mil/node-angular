import { Component, OnInit } from '@angular/core';
import { PageService } from '@app/home/services';
import { first } from 'rxjs/operators';

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
    contact;

    constructor(
        private pageService: PageService
    ) { }

    ngOnInit() {
        this.loadContact();
    }

    loadContact() {
        this.pageService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.contact) this.contact = res.data.contact;
                },
                err => {
                    
                }
            )
    }
}