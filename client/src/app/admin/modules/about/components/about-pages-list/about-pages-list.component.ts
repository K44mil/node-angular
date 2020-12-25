import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private alertService: AlertService,
        private router: Router
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

    increasePriority(id: string) {
        this.pages = null;
        this.aboutPageService.increaseAboutPagePriority(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadAboutPages();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    decreasePriority(id: string) {
        this.pages = null;
        this.aboutPageService.decreaseAboutPagePriority(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadAboutPages();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    editAboutPage(id: string) {
        this.router.navigate([`/admin/about/edit_about_page/${id}`]);
    }
}