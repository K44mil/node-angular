import { Component, OnInit } from '@angular/core';

import { News } from '@admin/modules/news/models/News';
import { PageService } from '@home/services';
import { first } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AlertService, AuthService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'news.component.html',
    styles: [
        `
            .lock-icon {
                color: #fff;
                font-size: 1rem;
                cursor: mark;
            }
        `
    ]
})
export class NewsComponent implements OnInit {
    public news: News[];

    filterForm: FormGroup;

    // PAGINATION
    totalPages: number;
    countTotal: number;
    pagination: any;
    currentPage: number = 1;

    // Query string
    private query: string = `?limit=8&page=${this.currentPage}`;

    constructor(
        private pageService: PageService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            title: ['']
        });

        this.loadNews(this.query);
    }

    loadNews(query: string) {
        this.pageService.getNews(query)
            .pipe(first())
            .subscribe(
                res => {
                    this.news = res.data.news;
                    this.pagination = res.data.pagination;
                    this.totalPages = res.data.countPages;
                    this.countTotal = res.data.count;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    get f() { return this.filterForm.controls; }

    getFilterQuery() {
        let query = '';

        if (this.f.title.value) query += `&title=${this.f.title.value}`;
    
        return query;
    }

    clearQuery() {
        this.query = `?limit=8&page=${this.currentPage}`;
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
    }

    onFilterFormSubmit() {
        this.currentPage = 1;
        this.prepareQuery();
        this.loadNews(this.query);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.prepareQuery();
            this.loadNews(this.query);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.prepareQuery();
            this.loadNews(this.query);
        }
    }

    getNewsPhotoUrl(news) {
        return `${environment.hostUrl}/uploads/news/${news.image}`;
    }

    getNewsLink(news) {
        return `/news/${news.slug}`;
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    canActivate(news) {
        if (news.isLoginProtected && !this.authService.userValue) return false;
        return true;
    }

    authorized(news) {
        if (news.canOpen)
            return true;
        return false;
    }

}