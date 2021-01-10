import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Announcement } from '../../models/Announcement';

import { AnnouncementsService } from '../../services/announcements.service';

@Component({ templateUrl: 'announcements-list.component.html'})
export class AnnouncementsListComponent implements OnInit {
    announcements: Announcement[];
    pageOfItems: Array<any>;

    constructor(
        private announcementsService: AnnouncementsService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadAnnouncements();
    }

    loadAnnouncements() {
        this.announcementsService.getAnnouncements()
            .pipe(first())
            .subscribe(
                res => {
                    this.announcements = res.data.announcements;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            );
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    printDate(dateUTC) {
        if (dateUTC === null || dateUTC === undefined || dateUTC === '')
            return '';
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    delete(id) {
        this.announcementsService.deleteAnnouncement(id)
            .pipe(first())
            .subscribe(res => {
                if (res.success == true) {
                    this.alertService.clear();
                    this.alertService.success('Announcement has been deleted.', {
                        autoClose: true
                    });
                    this.loadAnnouncements();
                }
            },
            err => {
                this.alertService.error(err);
            });
    }

    edit(id) {
        this.router.navigate([`/admin/announcements/edit_announcement/${id}`])
    }

    changeVisibility(id) {
        this.announcementsService.changeVisibility(id)
            .pipe(first())
            .subscribe(res => {
                this.loadAnnouncements();
            },
            err => {
                this.alertService.clear();
                this.alertService.error(err, {
                    autoClose: true
                });
            })
    }
}