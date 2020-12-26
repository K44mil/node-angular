import { Component, OnInit } from '@angular/core';

import { News } from '@admin/modules/news/models/News';
import { PageService } from '@home/services';
import { first } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AlertService, AuthService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '@app/admin/modules/news/models/Category';

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
    public categories: Category[];

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
        this.loadCategories();
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

    loadCategories() {
        this.pageService.getCategories()
            .pipe(first())
            .subscribe(
                res => {
                    this.categories = res.data.categories;
                },
                err => {

                }
            )
    }

    selectedCategoryId: string;

    selectCategory(id: string) {
        if (this.selectedCategoryId && this.selectedCategoryId === id)
            this.selectedCategoryId = null;
        else
            this.selectedCategoryId = id;

        this.currentPage = 1;
        this.prepareQuery();
        this.setNewsToNull();
        this.loadNews(this.query);
    }

    getCategoryButtonClass(id: string) {
        if (this.selectedCategoryId === id)
            return 'btn-primary';
        return 'btn-outline-primary';
    }

    get f() { return this.filterForm.controls; }

    getFilterQuery() {
        let query = '';

        if (this.f.title.value) query += `&title=${this.f.title.value}`;
        console.log(query);
        if (this.selectedCategoryId) query += `&categoryId=${this.selectedCategoryId}`;
    
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
        this.setNewsToNull();
        this.loadNews(this.query);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.prepareQuery();
            this.setNewsToNull();
            this.loadNews(this.query);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.prepareQuery();
            this.setNewsToNull();
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

    setNewsToNull() {
        this.news = null;
    }
}