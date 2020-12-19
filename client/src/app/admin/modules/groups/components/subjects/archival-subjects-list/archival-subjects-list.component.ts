import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Subject } from '../../../models';
import { SubjectsService } from '../../../services/subjects.service';

@Component({ templateUrl: 'archival-subjects-list.component.html' })
export class ArchivalSubjectsListComponent implements OnInit {
    subjects: Subject[];

    constructor(
        private subjectsService: SubjectsService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
       this.loadSubjects();
    }

    loadSubjects() {
        this.subjectsService.getSubjects('?isArchive=1')
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
                        this.loadSubjects();
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
                    this.loadSubjects()
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    window.scrollTo(0, 0);
                }
            )
    }
}