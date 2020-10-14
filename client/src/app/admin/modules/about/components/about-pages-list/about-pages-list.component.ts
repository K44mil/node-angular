import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AboutPage } from '../../models';
import { AboutPageService } from '../../services';

@Component({
    templateUrl: 'about-pages-list.component.html'
})
export class AboutPagesListComponent implements OnInit {

    public pages: AboutPage[];

    constructor(private aboutPageService: AboutPageService) { }

    ngOnInit() {
        this.aboutPageService.getAboutPages()
            .pipe(first())
            .subscribe(res => this.pages = res.data.pages);
    }
}