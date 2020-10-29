import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { News } from '../../models/News';

import { NewsService } from '../../services/news.service';

@Component({ templateUrl: 'news-list.component.html' })
export class NewsListComponent implements OnInit {
    news: News[];

    constructor(
        private newsService: NewsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadNews();
    }

    loadNews() {
        this.newsService.getNews()
            .pipe(first())
            .subscribe(res => {
                if (res.data.news)
                    this.news = res.data.news;
            },
            err => {

            });
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    changeProtected(id) {
        this.newsService.changeProtected(id)
            .pipe(first())
            .subscribe(res => {}, err => { this.alertService.error(err); });
    }

    changeVisibility(id) {
        this.newsService.changeVisibility(id)
            .pipe(first())
            .subscribe(res => {}, err => { this.alertService.error(err); });
    }

    changeCommentable(id) {
        this.newsService.changeCommentable(id)
            .pipe(first())
            .subscribe(res => {}, err => { this.alertService.error(err); });
    }
}