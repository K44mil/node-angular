import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Announcement } from '../../models/Announcement';

import { AnnouncementsService } from '../../services/announcements.service';

@Component({ templateUrl: 'announcements-list.component.html'})
export class AnnouncementsListComponent implements OnInit {
    announcements: Announcement[];

    constructor(
        private announcementsService: AnnouncementsService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.loadAnnouncements();
    }

    loadAnnouncements() {
        this.announcementsService.getAnnouncements()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.announcements)
                        this.announcements = res.data.announcements;
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    printDate(dateUTC) {
        if (dateUTC === null || dateUTC === undefined || dateUTC === '')
            return '';
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    delete(id) {
        if (confirm("Are you sure to delete this announcement?")) {
            this.announcementsService.deleteAnnouncement(id)
                .pipe(first())
                .subscribe(res => {
                    if (res.success == true) {
                        this.alertService.success('Announcement deleted.', {
                            autoClose: true
                        });
                        this.loadAnnouncements();
                    }
                },
                err => {
                    this.alertService.error(err);
                });
        }
    }
}