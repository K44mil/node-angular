import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';
import { CategoriesService } from '../../services/categories.service';
import { ModalService } from '@app/shared/services/modal.service';
import { File } from '../../../files/models/File';
import { environment } from '@env/environment';

@Component({
    templateUrl: 'add-news.component.html',
    styles: [`
        .image-preview { width: 200px; height: 200px; }
    `]
})
export class AddNewsComponent implements OnInit {
    addNewsForm: FormGroup;
    categories;
    loading: boolean = false;

    files: File[] = [];

    fileUnlinked: boolean = false;

    submitted: boolean = false;

    private access: any = {
        isOn: false,
        courses: [],
        groups: [],
        users: []
    };

    public config = {
        removeButtons: 'Anchor,Maximize,Scayt,About',
        height: '550px'
    };

    constructor(
        private newsService: NewsService,
        private categoriesService: CategoriesService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.loadCategories();

        this.addNewsForm = this.formBuilder.group({
            photo: [''],
            title: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', Validators.maxLength(512)],
            content: ['', Validators.maxLength(1000000)],
            categoriesIds: [''],
            // Sections
            photoSection: [''],
            filesSection: [''],
            accessOn: [''],
            // Other Settings
            isLoginProtected: [''],
            isCommentable: [''],
            isVisible: [true],
        });
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

    get f() { return this.addNewsForm.controls; }

    onSubmit() {
        this.submitted = true;
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
        formData.append('photo', this.addNewsForm.get('photo').value);
        formData.append('title', this.addNewsForm.get('title').value);
        formData.append('description', this.addNewsForm.get('description').value);
        formData.append('content', this.addNewsForm.get('content').value);
        formData.append('categories', this.addNewsForm.get('categoriesIds').value);
        formData.append('isLoginProtected', this.addNewsForm.get('isLoginProtected').value);
        formData.append('isCommentable', this.addNewsForm.get('isCommentable').value);
        formData.append('isVisible', this.addNewsForm.get('isVisible').value);

        // Sections
        if (this.f.photoSection.value == '')
            this.addNewsForm.patchValue({
                photoSection: false
            });
        formData.append('photoSection', this.addNewsForm.get('photoSection').value);
        if (this.f.filesSection.value == '')
            this.addNewsForm.patchValue({
                filesSection: false
            });
        formData.append('filesSection', this.addNewsForm.get('filesSection').value);

        // Files
        const filesIds = [];
        for (const file of this.files) {
            filesIds.push(file.id);
        }        

        // Append filesIds to FormData Object
        formData.append('files', JSON.stringify(filesIds));

        // Access object
        if (this.f.accessOn.value == '') {
            this.addNewsForm.patchValue({
                accessOn: false
            });
        } 

        this.access.isOn = this.f.accessOn.value;
        formData.append('access', JSON.stringify(this.access));

        this.loading = true;
        this.newsService.createNews(formData)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success == true) {
                        this.alertService.success('News has been added.', {
                            keepAfterRouteChange: true,
                            autoClose: true
                        });
                        this.loading = false;
                        this.submitted = false;
                        this.router.navigate(['/admin/news']);
                    }
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.loading = false;
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

    public photoUrl: string = `${environment.hostUrl}/uploads/news/no-news-photo.jpg`;

    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) {
            this.photoUrl = `${environment.hostUrl}/uploads/news/no-news-photo.jpg`;
            return;
        }
        this.addNewsForm.patchValue({
            photo: file
        });
        this.addNewsForm.get('photo').updateValueAndValidity();

        // Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.photoUrl = reader.result as string;
        }
        reader.readAsDataURL(file);
    }

    // INPUT CHANGES
    photoSectionOn: boolean = false;
    filesSectionOn: boolean = false;
    accessSectionOn: boolean = false;

    onPhotoSectionChange() {
        if (this.f.photoSection.value)
            this.photoSectionOn = true;
        else this.photoSectionOn = false;
    }

    onFilesSectionChange() {
        if (this.f.filesSection.value)
            this.filesSectionOn = true;
        else this.filesSectionOn = false
    }

    onAccessSectionChange() {
        if (this.f.accessOn.value) {
            this.accessSectionOn = true;
            this.f.isLoginProtected.disable();
            this.addNewsForm.patchValue({ isLoginProtected: true });
        }
        else {
            this.accessSectionOn = false;
            this.f.isLoginProtected.enable();
            this.addNewsForm.patchValue({ isLoginProtected: false });
        }
    }
}