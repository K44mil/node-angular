import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';

@Component({ templateUrl: 'add-news.component.html' })
export class AddNewsComponent implements OnInit {
    categories;

    constructor(
        private newsService: NewsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.newsService.getCategories()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.categories)
                        this.categories = res.data.categories;
                },
                err => {

                }
            )
    }
}