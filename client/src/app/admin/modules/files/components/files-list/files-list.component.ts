import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { FilesService } from '../../services/files.service';
import { File } from '../../models/File';
import { AlertService } from '@app/shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({ templateUrl: 'files-list.component.html' })
export class FilesListComponent implements OnInit {
    files: File[];
    uploadFileForm: FormGroup;
    uploadProgress: number = 0;

    private KB = 1024;
    private MB = 1024*1024;
    private GB = 1024*1024*1024;

    @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

    constructor(
        private filesService: FilesService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadFiles();

        this.uploadFileForm = this.formBuilder.group({
            file: [''],
            fileSource: ['']
        });
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
                                    this.loadFiles();
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

    loadFiles() {
        this.filesService.getFiles()
            .pipe(first())
            .subscribe(
                res => {
                    this.files = res.data.files;
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
                    this.loadFiles();
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
}