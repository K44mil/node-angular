import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageService } from '@app/home/services';
import { environment } from '@env/environment';
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
    loading: boolean = true;

    constructor(
        private pageService: PageService,
        private titleService: Title
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Contact');
    }

    ngOnInit() {
        this.loadContact();
    }

    loadContact() {
        this.pageService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.contact) this.contact = res.data.contact;
                    this.loading = false;
                },
                err => {
                    
                }
            )
    }

    getUniversityPhotoUrl() {
        if (this.contact && this.contact.university)
            return `${environment.hostUrl}/uploads/${this.contact.university.image}`;
        return '';
    }
}