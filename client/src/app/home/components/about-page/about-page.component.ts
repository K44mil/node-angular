import { Component, OnInit } from '@angular/core';

import { PageService } from '@home/services';
import { first } from 'rxjs/operators';

import { AboutPage } from '@admin/modules/about/models';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'about-page.component.html',
    styles: [`a.nav-link {
                cursor: pointer;
                color: #303030;
            }
            .active {
                background: #303030 !important;
            }
    `]
})
export class AboutPageComponent implements OnInit {

    public loading = true;
    public pages: AboutPage[];
    public currentPage: AboutPage;

    constructor(
        private pageService: PageService,
        private titleService: Title
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - About Page');
    }

    ngOnInit() {
        this.pageService.getAboutPages()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.pages) this.pages = res.data.pages;
                    if (this.pages) this.currentPage = this.pages[0];
                    this.loading = false;
                }
            );
    }

    setCurrentPage(page: AboutPage) {
        this.currentPage = page;    
    }
}