import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AboutPage } from '../../models';
import { AboutPageService } from '../../services';

@Component({
    templateUrl: 'about-pages-list.component.html'
})
export class AboutPagesListComponent implements OnInit {

    public pages: AboutPage[];

    constructor(
        private aboutPageService: AboutPageService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadAboutPages();
    }

    loadAboutPages() {
        this.aboutPageService.getAboutPages()
            .pipe(first())
            .subscribe(
                res => {
                    this.pages = res.data.pages;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    deleteAboutPage(id: string) {
        this.aboutPageService.deleteAboutPage(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('About Page has been deleted.', {
                        autoClose: true
                    });
                    this.loadAboutPages();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }
}