import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';

@Component({ templateUrl: 'add-news.component.html' })
export class AddNewsComponent implements OnInit {
    addNewsForm: FormGroup;
    categories;

    public config = {
        removeButtons: 'Anchor,Image,Maximize,Scayt,About'
    };

    constructor(
        private newsService: NewsService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCategories();

        this.addNewsForm = this.formBuilder.group({
            photo: [''],
            photoSource: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            content: [''],
            categoriesIds: [''],
            // files
            files: [''],
            filesSource: [''],
            // --
            isLoginProtected: [''],
            isCommentable: [''],
            isVisible: ['']
        });
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

    onPhotoFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.addNewsForm.patchValue({
                photoSource: file
            });
        }
    }

    onFilesChange(event) {
        if (event.target.files.length > 0) {
            this.addNewsForm.patchValue({
                filesSource: event.target.files
            });
        } 
    }

    get f() { return this.addNewsForm.controls; }

    onSubmit() {
        if (this.addNewsForm.invalid) return;

        if (this.f.isLoginProtected.value == '') {
            this.addNewsForm.patchValue({
                isLoginProtected: false
            });
        }

        if (this.f.isCommentable.value == '') {
            this.addNewsForm.patchValue({
                isCommentable: false
            });
        }

        if (this.f.isVisible.value == '') {
            this.addNewsForm.patchValue({
                isVisible: false
            });
        }

        const formData = new FormData();
        formData.append('photo', this.addNewsForm.get('photoSource').value);
        formData.append('title', this.addNewsForm.get('title').value);
        formData.append('description', this.addNewsForm.get('description').value);
        formData.append('content', this.addNewsForm.get('content').value);
        formData.append('categories', this.addNewsForm.get('categoriesIds').value);
        formData.append('isLoginProtected', this.addNewsForm.get('isLoginProtected').value);
        formData.append('isCommentable', this.addNewsForm.get('isCommentable').value);
        formData.append('isVisible', this.addNewsForm.get('isVisible').value);
        // formData.append('files', this.addNewsForm.get('filesSource').value);

        const files = this.addNewsForm.get('filesSource').value;
        for(let i = 0; i < files.length; i++) {
            formData.append(`files`, files[i]);
        }

        this.newsService.createNews(formData)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success == true) {
                        this.alertService.success('News has been added.', {
                            keepAfterRouteChange: true,
                            autoClose: true
                        });
                        this.router.navigate(['/admin/news']);
                    }
                },
                err => {
                    this.alertService.error(err);
                }
            )

    }
}