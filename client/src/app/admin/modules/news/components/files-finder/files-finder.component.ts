import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilesService } from '@app/admin/modules/files/services/files.service';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { File } from '../../../files/models/File';

@Component({
    selector: 'files-finder',
    templateUrl: 'files-finder.component.html'
})
export class FilesFinderComponent implements OnInit, OnChanges {
    filterForm: FormGroup;
    files: File[] = [];

    private KB = 1024;
    private MB = 1024*1024;
    private GB = 1024*1024*1024;

    // Mass Actions
    selectedItems: string[] = [];
    allSelected = false;

    @Input() newsFiles: File[];
    @Input() fileUnlinked: boolean;
    @Output() filesLinked: EventEmitter<File[]> = new EventEmitter<File[]>();

    private query: string = '?';

    constructor(
        private formBuilder: FormBuilder,
        private modalService: ModalService,
        private filesService: FilesService
    ) { }

    ngOnInit() {
        this.prepareQuery();
        this.loadFiles(this.query);
    }

    get f() { return this.filterForm.controls; }

    ngOnChanges() {
        this.filterForm = this.formBuilder.group({
            name: ['']
        });

        this.prepareQuery();
        this.loadFiles(this.query);
    }

    clearSelect() {
        const selectAllElement = <HTMLInputElement> document.getElementById('select-all');
        selectAllElement.checked = false;
        this.allSelected = false;
        this.selectedItems = [];
    }

    loadFiles(query: string) {
        this.filesService.getFiles(query)
            .pipe(first())
            .subscribe(
                res => {
                    const resFiles = res.data.files;
                    this.files = [];
                    for (const file of resFiles) {
                        let isLinked = false;
                        for (const file2 of this.newsFiles) {
                            if (file.id === file2.id) isLinked = true;
                        }
                        if (!isLinked) this.files.push(file);
                    }
                },
                err => {

                }
            )
    }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = '?';
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
    }

    getFilterQuery() {
        let query = '';

        if (this.f.name.value) query += `name=${this.f.name.value}`;

        return query;
    }

    onFormInputsChange() {
        this.prepareQuery();
        this.loadFiles(this.query);
    }

    linkFiles() {
        const files = this.files.filter(f => {
            if (this.selectedItems.includes(f.id)) return f;
        });
        this.filesLinked.emit(files);
        this.prepareQuery();
        this.loadFiles(this.query);
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

    selectOrUnselectItem(id: string) {
        if (!this.selectedItems.includes(id))
            this.selectedItems.push(id);
        else
            this.selectedItems = this.selectedItems.filter(i => i !== id);
    }

    selectOrUnselectAllItems() {
        let fileSelects: HTMLInputElement[];
        fileSelects = Array.from(document.querySelectorAll('.file-select'));
        if (!this.allSelected) {
            fileSelects.forEach(uS => {
                uS.checked = true;
            });
            // Push all users
            this.selectedItems = [];
            for (const file of this.files) {
                this.selectedItems.push(file.id);
            }
            this.allSelected = true;
        } else {
            fileSelects.forEach(uS => {
                uS.checked = false;
            });
            // Remove all users
            this.selectedItems = [];
            this.allSelected = false;
        }
    }
}