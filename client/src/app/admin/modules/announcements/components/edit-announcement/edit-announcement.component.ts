import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AnnouncementValidator } from '../../validators/AnnouncementValidator';
import { AnnouncementsService } from '../../services/announcements.service'; 

@Component({ templateUrl: 'edit-announcement.component.html' })
export class EditAnnouncementComponent implements OnInit {
    editAnnouncementForm: FormGroup;
    id: string;
    announcementLoaded: boolean = false;
    submitted: boolean = false;

    constructor(
        private announcementsService: AnnouncementsService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loadAnnouncement(this.id);

        this.editAnnouncementForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            content: ['', [Validators.required, Validators.maxLength(500)]],
            visibleFromDate: ['', Validators.required],
            visibleFromTime: ['', Validators.required],
            visibleFrom: [''],
            visibleToDate: ['', Validators.required],
            visibleToTime: ['', Validators.required],
            visibleTo: [''],
            isVisible: ['']
        }, {
            validator: AnnouncementValidator('visibleFromDate', 'visibleFromTime', 'visibleToDate', 'visibleToTime')
        });
    }

    loadAnnouncement(id) {
        this.announcementsService.getAnnouncement(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.announcement) {
                        const announcement = res.data.announcement;
                        announcement.visibleFromDate = this.parseDateToLocale(announcement.visibleFrom).split(', ')[0];
                        announcement.visibleFromTime = this.parseDateToLocale(announcement.visibleFrom).split(', ')[1];
                        announcement.visibleToDate = this.parseDateToLocale(announcement.visibleTo).split(', ')[0];
                        announcement.visibleToTime = this.parseDateToLocale(announcement.visibleTo).split(', ')[1];
                        this.editAnnouncementForm.patchValue({
                            title: announcement.title,
                            content: announcement.content,
                            visibleFromDate: this.parseDate(announcement.visibleFromDate),
                            visibleFromTime: announcement.visibleFromTime,
                            visibleToDate: this.parseDate(announcement.visibleFromDate),
                            visibleToTime: announcement.visibleToTime,
                            isVisible: announcement.isVisible
                        });
                    }
                    this.announcementLoaded = true;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/announcements']);
                }
            )
    }

    parseDateToLocale(dateUTC) {
        return new Date(dateUTC).toLocaleString('pl', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    parseDate(date) {
        const dateArr = date.split('.');
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    }

    get f() { return this.editAnnouncementForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.editAnnouncementForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.editAnnouncementForm.patchValue({
                isVisible: false
            });
        }

        this.editAnnouncementForm.patchValue({
            visibleFrom: `${this.f.visibleFromDate.value} ${this.f.visibleFromTime.value}`,
            visibleTo: `${this.f.visibleToDate.value} ${this.f.visibleToTime.value}`
        });

        this.announcementsService.updateAnnouncement(this.id, this.editAnnouncementForm.value)
            .pipe(first())
            .subscribe(res => {
                if (res.success == true) {
                    this.alertService.success('Announcement has been updated.', {
                        keepAfterRouteChange: true,
                        autoClose: true
                    });
                    this.submitted = false;
                    // this.router.navigate(['/admin/announcements']);
                    window.scrollTo(0, 0);
                }
            },
            err => {
                this.alertService.clear();
                this.alertService.error(err, { autoClose: true });
            })
    }
}