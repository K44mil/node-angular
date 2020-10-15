import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { News } from '@admin/modules/news/models/News';
import { PageService } from '@home/services';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/shared/services';

@Component({
    templateUrl: 'news-details.component.html'
})
export class NewsDetailsComponent implements OnInit {
    public news: News;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        this.pageService.getNewsBySlug(slug)
            .pipe(first())
            .subscribe(
                res => {
                    this.news = res.data.news
                },
                err => {
                    this.alertService.error(err);
            });
    }

    getNewsPhotoUrl(news) {
        return `${environment.hostUrl}/uploads/news/${news.image}`;
    }
}