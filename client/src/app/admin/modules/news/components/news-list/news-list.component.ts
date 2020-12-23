import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Category } from '../../models/Category';
import { News } from '../../models/News';
import { CategoriesService } from '../../services/categories.service';
import { NewsService } from '../../services/news.service';

@Component({
    templateUrl: 'news-list.component.html',
    styles: [`
        .sort-header { cursor: pointer; }
    `]
})
export class NewsListComponent implements OnInit {
    news: News[];
    categories: Category[];

    // PAGINATION
    totalPages: number;
    countTotal: number;
    pagination: any;
    currentPage: number = 1;

    // Items per page
    itemsPerPageControl: FormControl;
    itemsPerPage: number = 25;

    // Filter Form
    filterForm: FormGroup;

    // SORTING
    sort = { property: null, order: null };

    // Query string
    private query: string = `?limit=${this.itemsPerPage}&page=${this.currentPage}`;

    constructor(
        private newsService: NewsService,
        private alertService: AlertService,
        private router: Router,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService
    ) { }

    ngOnInit() {
        this.loadNews(this.query);
        this.loadCategories();
        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.itemsPerPage);

        // Filter form
        this.filterForm = this.formBuilder.group({
            title: [''],
            categoryId: ['']
        });
 
    }

    loadNews(query: string) {
        this.newsService.getNews(query)
            .pipe(first())
            .subscribe(res => {
                this.news = res.data.news;
                this.countTotal = res.data.count;
                this.pagination = res.data.pagination;
                this.totalPages = res.data.countPages;
            },
            err => {
                this.alertService.clear();
                this.alertService.error(err, { autoClose: true });
            });
    }

    loadCategories() {
        this.categoriesService.getCategories()
            .pipe(first())
            .subscribe(
                res => {
                    this.categories = res.data.categories;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    get f() { return this.filterForm.controls; }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    clearQuery() {
        // this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}`;
    }

    getFilterQuery() {
        let query = '';

        if (this.f.title.value) query += `&title=${this.f.title.value}`;
        if (this.f.categoryId.value) query += `&categoryId=${this.f.categoryId.value}`;
        return query;
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    setItemsPerPage(value: number) {
        this.currentPage = 1;
        this.itemsPerPage = value;
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

    changeProtected(id) {
        this.newsService.changeProtected(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadNews(this.query);
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    changeVisibility(id) {
        this.newsService.changeVisibility(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadNews(this.query);
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    changeCommentable(id) {
        this.newsService.changeCommentable(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadNews(this.query);
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    deleteNews(id) {
        this.newsService.deleteNews(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('News has been deleted.', {
                        autoClose: true
                    });
                    this.loadNews(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    editNews(id: string) {
        this.router.navigate([`/admin/news/edit_news/${id}`]);
    }

    onSubmit() {
        this.currentPage = 1;
        this.prepareQuery();
        this.setNewsToNull();
        this.loadNews(this.query);
    }

     // SORTING FUNCTIONS
    sortBy(property: string) {
        if (this.sort.property === property) {
            if (this.sort.order === 'ASC') this.sort.order = 'DESC';
            else {
                this.sort.property = null;
                this.sort.order = null;
            }
        } else {
            this.sort.property = property;
            this.sort.order = 'ASC';
        }
        this.prepareQuery();
        this.loadNews(this.query);
    }

    printCategoriesAsTitle(categories: Category[]) {
        let title = '';
        for (const c of categories) {
            if (categories.indexOf(c) !== categories.length - 1)
                title += `${c.name}, `;
            else
                title += `${c.name}`;
        }
        return title;
    }

    resetFilterForm() {
        this.filterForm.reset();
        this.prepareQuery();
        this.setNewsToNull();
        this.loadNews(this.query);
    }

    setNewsToNull() {
        this.news = null;
        this.countTotal = null;
        this.pagination = null;
        this.totalPages = null;
    }
}