import { Component, OnInit } from '@angular/core';
import { PageService } from '@app/home/services';

import { Announcement } from '@admin/modules/announcements/models/Announcement';
import { first } from 'rxjs/operators';

@Component({
    selector: 'announcements',
    templateUrl: 'announcements.component.html',
})
export class AnnouncementsComponent implements OnInit {

    public announcements: Announcement[] = [];

    constructor(private pageService: PageService) {}

    ngOnInit() {
        let _a = JSON.parse(sessionStorage.getItem('_a'));
        if (!_a) _a = [];
        if (!Array.isArray(_a))
            _a = [];

        this.pageService.getAnnouncements()
            .pipe(first())
            .subscribe(res => {
                let announcements = res.data.announcements;
                let seconds = 10;
                for (const a of announcements) {
                    if (!_a.includes(a._id)) this.announcements.push(a);
                    setTimeout(() => {
                        this.autoCloseAnnouncement(a._id);
                    }, (seconds++) * 1000);
                }
            });
    }

    closeAnnouncement(id) {
        let _a = JSON.parse(sessionStorage.getItem('_a'));
        if (!Array.isArray(_a))
            _a = [];

        _a.push(id);
        sessionStorage.setItem('_a', JSON.stringify(_a));
    }

    autoCloseAnnouncement(id) {
        const btn = document.getElementById(`closeButton${id}`);
        if (btn) btn.click();
    }

    generateButtonId(id) {
        return `closeButton${id}`;
    }
}