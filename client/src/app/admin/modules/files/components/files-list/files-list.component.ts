import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { FilesService } from '../../services/files.service';
import { File } from '../../models/File';
import { AlertService } from '@app/shared/services';

@Component({ templateUrl: 'files-list.component.html' })
export class FilesListComponent implements OnInit {
    files: File[];

    private KB = 1024;
    private MB = 1024*1024;
    private GB = 1024*1024*1024;

    constructor(
        private filesService: FilesService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadFiles();
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
            return `${sizeNumber/this.GB} GB`;
        if (sizeNumber >= this.MB)
            return `${sizeNumber/this.MB} MB`;
        else
            return `${(sizeNumber/this.KB).toFixed(2)} KB`;
    }
}