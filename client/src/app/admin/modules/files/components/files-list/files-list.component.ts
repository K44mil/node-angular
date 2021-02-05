import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { FilesService } from '../../services/files.service';
import { File } from '../../models/File';
import { AlertService } from '@app/shared/services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
    templateUrl: 'files-list.component.html',
    styles: [`
        .sort-header { cursor: pointer; }
    `]
})
export class FilesListComponent implements OnInit {
    files: File[];
    uploadFileForm: FormGroup;
    uploadProgress: number = 0;

    private KB = 1024;
    private MB = 1024*1024;
    private GB = 1024*1024*1024;

    @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

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
        private filesService: FilesService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadFiles(this.query);

        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.itemsPerPage);

        // Filter form
        this.filterForm = this.formBuilder.group({
            name: ['']
        });

        this.uploadFileForm = this.formBuilder.group({
            file: [''],
            fileSource: ['']
        });
    }

    get f() { return this.filterForm.controls; }

    clearQuery() {
        // this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}`;
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    getFilterQuery() {
        let query = '';

        if (this.f.name.value) query += `&name=${this.f.name.value}`;

        return query;
    }

    setItemsPerPage(value: number) {
        this.currentPage = 1;
        this.itemsPerPage = value;
        this.prepareQuery();
        this.loadFiles(this.query);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.prepareQuery();
            this.loadFiles(this.query);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.prepareQuery();
            this.loadFiles(this.query);
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadFileForm.patchValue({
                fileSource: file
            });
        } 
    }

    onSubmit() {        
        if (this.uploadFileForm.invalid) return; 

        const formData = new FormData();
        formData.append('file', this.uploadFileForm.get('fileSource').value);

        this.filesService.uploadFile(formData)
            .subscribe(
                (event: HttpEvent<any>) => {
                    if (event && event !== undefined)
                        switch (event.type) {
                            case HttpEventType.Sent:
                                // console.log('Request has been made!');
                                break;
                            case HttpEventType.ResponseHeader:
                                // console.log('Response header has been received!');
                                break;
                            case HttpEventType.UploadProgress:
                                this.uploadProgress = Math.round(event.loaded / event.total * 100);
                                // console.log(`Uploaded! ${this.uploadProgress}%`);
                                break;
                            case HttpEventType.Response:
                                setTimeout(() => {
                                    this.loadFiles(this.query);
                                    this.alertService.clear();
                                    this.alertService.success('File has been uploaded.', {
                                        autoClose: true
                                    });
                                    const btnFileUploadModal = document.getElementById('btnFileUploadModal');
                                    btnFileUploadModal.click();
    
                                    // Reset Form
                                    this.uploadFileForm.reset();
                                    this.fileInput.nativeElement.value = '';
                                    this.uploadProgress = 0;
                                }, 500);  
                        }
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    const btnFileUploadModal = document.getElementById('btnFileUploadModal');
                    btnFileUploadModal.click();

                    // Reset Form
                    this.uploadFileForm.reset();
                    this.fileInput.nativeElement.value = '';
                    this.uploadProgress = 0;
                }
            );
    }

    loadFiles(query: string) {
        this.filesService.getFiles(query)
            .pipe(first())
            .subscribe(
                res => {
                    this.files = res.data.files;
                    this.countTotal = res.data.count;
                    this.pagination = res.data.pagination;
                    this.totalPages = res.data.countPages;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    deleteFile(id: string) {
        this.filesService.deleteFile(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('File has been deleted.', {
                        autoClose: true
                    });
                    this.loadFiles(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    downloadFile(id, fileName, fileType) {
        this.filesService.downloadFile(id)
            .pipe(first())
            .subscribe(res => {
                let blob: any = new Blob([res], { type: `${fileType}` });
                let url = window.URL.createObjectURL(blob);
                let anchor = document.createElement('a');
                anchor.download = fileName;
                anchor.href = url;
                anchor.click();
                // window.open(url);
            }, 
            err => {
                this.alertService.clear();
                this.alertService.error(err, {
                    autoClose: true
                });
                window.scrollTo(0,0);
            })
    }

    parseFileSize(size) {
        let sizeNumber = Number(size);
        if (sizeNumber >= this.GB)
            return `${(sizeNumber/this.GB).toFixed(2)} GB`;
        if (sizeNumber >= this.MB)
            return `${(sizeNumber/this.MB).toFixed(2)} MB`;
        else
            return `${(sizeNumber/this.KB).toFixed(2)} KB`;
    }

    downloadMySqlFile() {
        this.filesService.backupMySql()
            .pipe(first())
            .subscribe(
                res => {
                    let blob: any = new Blob([res], { type: `application/octet-stream` });
                    let url = window.URL.createObjectURL(blob);
                    let anchor = document.createElement('a');
                    anchor.download = 'backup.sql';
                    anchor.href = url;
                    anchor.click();
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

    onFilterFormSubmit() {
        this.currentPage = 1;
        this.prepareQuery();
        this.loadFiles(this.query);
    }

    printDate(dateUTC) {
        return new Date(dateUTC).toLocaleString("pl", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        })
    }

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
        this.loadFiles(this.query);
    }

    link: string;
    showLink(path: string) { }

    formatPath(path: string) {
        path = path.replace(/\/public/, '');
        return `${environment.serverUrl}${path}`;
    }
}