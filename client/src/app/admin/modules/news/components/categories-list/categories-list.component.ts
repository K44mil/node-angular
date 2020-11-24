import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { Category } from '../../models/Category';
import { CategoriesService } from '../../services/categories.service';

@Component({ templateUrl: 'categories-list.component.html' })
export class CategoriesListComponent implements OnInit {
    categories: Category[];

    constructor(
        private categoriesService: CategoriesService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadCategories();
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
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }
}