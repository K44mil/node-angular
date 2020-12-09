import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';

@Component({ templateUrl: 'add-category.component.html' })
export class AddCategoryComponent implements OnInit {
    public addCategoryForm: FormGroup;
    public submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.addCategoryForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(30)]]
        });
    }

    get f() { return this.addCategoryForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addCategoryForm.invalid) return;

        this.categoriesService.createCategory(this.addCategoryForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.success('Category has been added.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/news/categories']);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }
}