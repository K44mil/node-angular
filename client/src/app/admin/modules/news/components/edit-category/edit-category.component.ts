import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';

@Component({ templateUrl: 'edit-category.component.html' })
export class EditCategoryComponent implements OnInit {
    private categoryId: string;
    public editCategoryForm: FormGroup;
    public submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.editCategoryForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(30)]]
        });

        this.categoryId = this.route.snapshot.paramMap.get('id');
        this.loadCategory(this.categoryId);
    }

    get f() { return this.editCategoryForm.controls; }

    onSubmit() {
        if (this.editCategoryForm.invalid) return;

        this.categoriesService.updateCategory(this.categoryId, this.editCategoryForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Category has been updated.', {
                        autoClose: true
                    });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    loadCategory(id: string) {
        this.categoriesService.getCategory(id)
            .pipe(first())
            .subscribe(
                res => {
                    const category = res.data.category;
                    this.editCategoryForm.patchValue({
                        name: category.name
                    });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/news/categories']);
                }
            )
    }
}