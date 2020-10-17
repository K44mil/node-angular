import { Component, OnInit } from '@angular/core';
import { PageService } from '@app/home/services';

import { Announcement } from '@admin/modules/announcements/models/Announcement';
import { first } from 'rxjs/operators';

@Component({
    selector: 'announcements',
    templateUrl: 'announcements.component.html',
})
export class AnnouncementsComponent implements OnInit {

    public announcements: Announcement[];

    constructor(private pageService: PageService) {}

    ngOnInit() {
        this.pageService.getAnnouncements()
            .pipe(first())
            .subscribe(res => {
                if (res.data.announcements)
                    this.announcements = res.data.announcements;
            });
    }
}