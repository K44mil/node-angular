import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { MarksService } from '../../../services/marks.service';

@Component({ templateUrl: 'mark-descriptions-list.component.html' })
export class MarkDescriptionsListComponent implements OnInit {

    markDescs: any[];

    constructor(
        private alertService: AlertService,
        private marksService: MarksService,
        private router: Router
    ) { }

    ngOnInit() {    
        this.loadMarkDescriptions();
    }

    loadMarkDescriptions() {
        this.marksService.getMarkDescriptions()
            .pipe(first())
            .subscribe(
                res => {
                    this.markDescs = res.data.markDescriptions;
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

    deleteDescription(id: string) {
        this.marksService.deleteMarkDescription(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Mark Description has been deleted', {
                        autoClose: true
                    });
                    this.loadMarkDescriptions();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    editDescription(id: string) {
        this.router.navigate([`/admin/groups/marks/edit_mark_desc/${id}`]);
    }
}