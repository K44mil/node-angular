import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Subject } from '../../../models';
import { SubjectsService } from '../../../services/subjects.service';

@Component({ templateUrl: 'archival-subjects-list.component.html', styles: [`.sort-header {cursor:pointer;}`] })
export class ArchivalSubjectsListComponent implements OnInit {
    subjects: Subject[];
    filterForm: FormGroup;

    // SORTING
    sort = { property: null, order: null };

    query = '';

    constructor(
        private subjectsService: SubjectsService,
        private alertService: AlertService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            name: [''],
            short: ['']
        });

        this.prepareQuery();
        this.loadSubjects(this.query);
    }

    loadSubjects(query: string) {
        this.subjectsService.getSubjects(query)
        .pipe(first())
        .subscribe(
            res => {
                this.subjects = res.data.subjects;
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

    subjectToDeleteId: string;

    setSubjectToDelete(id: string) {
        this.subjectToDeleteId = id;
    }

    deleteSubject() {
        if (this.subjectToDeleteId)
            this.subjectsService.deleteSubject(this.subjectToDeleteId)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.success('Subject has been deleted.', {
                            autoClose: true
                        });
                        this.prepareQuery();
                        this.loadSubjects(this.query);
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

    editSubject(id: string) {
        this.router.navigate([`/admin/groups/subjects/${id}/edit`]);
    }

    restoreSubject(id: string) {
        this.subjectsService.restoreSubject(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.prepareQuery();
                    this.loadSubjects(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    window.scrollTo(0, 0);
                }
            )
    }

    clearQuery() {
        this.query = `?isArchive=1`;
    }

    get f() { return this.filterForm.controls; }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    getFilterQuery() {
        let query = '';

        if (this.f.name.value) query += `&name=${this.f.name.value}`;
        if (this.f.short.value) query += `&short=${this.f.short.value}`;

        return query;
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
        this.loadSubjects(this.query);
    }

    onFilterFormSubmit() {
        this.prepareQuery();
        this.loadSubjects(this.query);
    }
}