import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Subject } from '../../../models';
import { SubjectsService } from '../../../services/subjects.service';

@Component({ templateUrl: 'subjects-list.component.html' })
export class SubjectsListComponent implements OnInit {
    subjects: Subject[];

    constructor(
        private subjectsService: SubjectsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
       this.loadSubjects();
    }

    loadSubjects() {
        this.subjectsService.getSubjects()
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
}