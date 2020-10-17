import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { News } from '@admin/modules/news/models/News';
import { PageService } from '@home/services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/shared/services';

@Component({
    templateUrl: 'news-details.component.html',
    styles: [
        `
            .user-name {
                font-size: 1.3rem;
            }
            .comment-break {
                width: 75%;
            }
        `
    ]
})
export class NewsDetailsComponent implements OnInit {
    public news: News;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router,
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
                    this.router.navigate(['/']);
            });
    }

    getNewsPhotoUrl(news) {
        return `${environment.hostUrl}/uploads/news/${news.image}`;
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    getUserName() {
        return 'Jan Kowalski';
    }
}