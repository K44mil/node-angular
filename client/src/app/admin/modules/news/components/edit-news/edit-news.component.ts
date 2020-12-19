import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';
import { CategoriesService } from '../../services/categories.service';
import { File } from '../../../files/models/File';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';

@Component({ templateUrl: 'edit-news.component.html' })
export class EditNewsComponent implements OnInit {
    editNewsForm: FormGroup;
    categories;
    loading: boolean = false;

    files: File[] = [];

    fileUnlinked: boolean = false;

    newsId: string;

    private access: any = {
        isOn: false,
        courses: [],
        groups: [],
        users: []
    };

    initAccess: any;

    public config = {
        removeButtons: 'Anchor,Image,Maximize,Scayt,About'
    };

    constructor(
        private newsService: NewsService,
        private categoriesService: CategoriesService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private modalService: ModalService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loadCategories();

        this.editNewsForm = this.formBuilder.group({
            photo: [''],
            photoSource: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            content: [''],
            categoriesIds: [''],

            // --
            isLoginProtected: [''],
            isCommentable: [''],
            isVisible: [''],
            accessOn: ['']
        });

        this.newsId = this.route.snapshot.paramMap.get('id');
        this.loadNews(this.newsId);
    }

    loadCategories() {
        this.categoriesService.getCategories()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.categories)
                        this.categories = res.data.categories;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    loadNews(id: string) {
        this.newsService.getNewsById(id)
            .pipe(first())
            .subscribe(
                res => {
                    const news = res.data.news;
                    const categories = [];
                    for (const c of news.Categories) {
                        categories.push(c.id);
                    }
                    this.editNewsForm.patchValue({
                        title: news.title,
                        description: news.description,
                        content: news.content,
                        // CATEGORIES
                        categoriesIds: categories,
                        isLoginProtected: news.isLoginProtected,
                        isCommentable: news.isCommentable,
                        isVisible: news.isVisible,
                        accessOn: news.NewsAccess.isOn
                    });
                    this.initAccess = news.NewsAccess;
                    this.files = news.Files;
                    
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/news']);
                }
            )
    }

    onPhotoFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.editNewsForm.patchValue({
                photoSource: file
            });
        }
    }

    get f() { return this.editNewsForm.controls; }

    testuj() {
        console.log(this.f.categoriesIds.value);
    }

    onSubmit() {
        if (this.editNewsForm.invalid) return;

        if (this.f.isLoginProtected.value == '') {
            this.editNewsForm.patchValue({
                isLoginProtected: false
            });
        }

        if (this.f.isCommentable.value == '') {
            this.editNewsForm.patchValue({
                isCommentable: false
            });
        }

        if (this.f.isVisible.value == '') {
            this.editNewsForm.patchValue({
                isVisible: false
            });
        }        

        const formData = new FormData();
        formData.append('photo', this.editNewsForm.get('photoSource').value);
        formData.append('title', this.editNewsForm.get('title').value);
        formData.append('description', this.editNewsForm.get('description').value);
        formData.append('content', this.editNewsForm.get('content').value);
        formData.append('categories', this.editNewsForm.get('categoriesIds').value);
        formData.append('isLoginProtected', this.editNewsForm.get('isLoginProtected').value);
        formData.append('isCommentable', this.editNewsForm.get('isCommentable').value);
        formData.append('isVisible', this.editNewsForm.get('isVisible').value);

        // Files
        const filesIds = [];
        for (const file of this.files) {
            filesIds.push(file.id);
        }        

        // Append filesIds to FormData Object
        formData.append('files', JSON.stringify(filesIds));

        // Access object
        this.access.isOn = this.f.accessOn.value;
        formData.append('access', JSON.stringify(this.access));

        this.loading = true;
        this.newsService.updateNews(this.newsId, formData)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success == true) {
                        this.alertService.success('News has been edited.', {
                            keepAfterRouteChange: true,
                            autoClose: true
                        });
                        this.loading = false;
                        window.scrollTo(0, 0);
                    }
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0, 0);
                }
            )
    }

    onFilesLinked(event) {
        for (const file of event) {
            let isLinked = false;
            for (const file2 of this.files) {
                if (file.id === file2.id) isLinked = true;
            }
            if (!isLinked) this.files.push(file);
        }
    }

    openModal(id: string) {  
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    getLinkFileModalClasses() {
        return 'col-6,offset-3';
    }

    unlinkFile(id: string) {
        this.files = this.files.filter(f => f.id !== id);
        if (this.fileUnlinked) this.fileUnlinked = false;
        else this.fileUnlinked = true;
    }

    onAccessChanged(event) {
        this.access = event;
    }
}