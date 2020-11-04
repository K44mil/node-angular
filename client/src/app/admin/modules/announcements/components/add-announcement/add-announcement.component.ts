import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AnnouncementsService } from '../../services/announcements.service'; 

@Component({ templateUrl: 'add-announcement.component.html' })
export class AddAnnouncementComponent implements OnInit {
    addAnnouncementForm: FormGroup;

    constructor(
        private announcementsService: AnnouncementsService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit() {
        this.addAnnouncementForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            visibleFromDate: ['', Validators.required],
            visibleFromTime: ['', Validators.required],
            visibleFrom: [''],
            visibleToDate: ['', Validators.required],
            visibleToTime: ['', Validators.required],
            visibleTo: [''],
            isVisible: ['']
        });
    }

    get f() { return this.addAnnouncementForm.controls; }

    onSubmit() {
        if (this.addAnnouncementForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.addAnnouncementForm.patchValue({
                isVisible: false
            });
        }

        this.addAnnouncementForm.patchValue({
            visibleFrom: `${this.f.visibleFromDate.value} ${this.f.visibleFromTime.value}`,
            visibleTo: `${this.f.visibleToDate.value} ${this.f.visibleToTime.value}`
        });

        this.announcementsService.createAnnouncement(this.addAnnouncementForm.value)
            .pipe(first())
            .subscribe(res => {
                if (res.success == true) {
                    this.alertService.success('Announcement has been added.', {
                        keepAfterRouteChange: true,
                        autoClose: true
                    });
                    this.router.navigate(['/admin/announcements']);
                }
            },
            err => {
                this.alertService.error(err);
            })
    }
}