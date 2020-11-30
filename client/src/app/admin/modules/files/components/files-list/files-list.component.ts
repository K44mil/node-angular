import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { FilesService } from '../../services/files.service';
import { File } from '../../models/File';

@Component({ templateUrl: 'files-list.component.html' })
export class FilesListComponent implements OnInit {
    files: File[];

    constructor(
        private filesService: FilesService
    ) { }

    ngOnInit() {
        this.filesService.getFiles()
            .pipe(first())
            .subscribe(
                res => {
                    this.files = res.data.files;
                },
                err => {
                    console.log(err);
                }
            )
    }
}