import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageService } from '@app/home/services';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'calendar-page.component.html'
})
export class CalendarPageComponent implements OnInit {
    calendarURL: string;

    constructor(
        private pageService: PageService,
        private alertService: AlertService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.loadCalendar();
    }

    loadCalendar() {
        this.pageService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data && res.data.contact)
                        this.calendarURL = res.data.contact.calendarUrl;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    parseCalendarUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.calendarURL);
    }
}