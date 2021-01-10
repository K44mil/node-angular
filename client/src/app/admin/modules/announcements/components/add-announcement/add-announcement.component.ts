import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { AnnouncementValidator } from '../../validators/AnnouncementValidator';
import { AnnouncementsService } from '../../services/announcements.service'; 

@Component({ templateUrl: 'add-announcement.component.html' })
export class AddAnnouncementComponent implements OnInit {
    addAnnouncementForm: FormGroup;
    submitted: boolean = false;

    constructor(
        private announcementsService: AnnouncementsService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit() {
        this.addAnnouncementForm = this.formBuilder.group({
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

    get f() { return this.addAnnouncementForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addAnnouncementForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.addAnnouncementForm.patchValue({
                isVisible: false
            });
        }

        this.addAnnouncementForm.patchValue({
            visibleFrom: `${new Date(`${this.f.visibleFromDate.value} ${this.f.visibleFromTime.value}`).toISOString()}`,//`${this.f.visibleFromDate.value} ${this.f.visibleFromTime.value}`,
            visibleTo:  `${new Date(`${this.f.visibleToDate.value} ${this.f.visibleToTime.value}`).toISOString()}`//`${this.f.visibleToDate.value} ${this.f.visibleToTime.value}`
        });

        this.announcementsService.createAnnouncement(this.addAnnouncementForm.value)
            .pipe(first())
            .subscribe(res => {
                if (res.success == true) {
                    this.alertService.success('Announcement has been added.', {
                        keepAfterRouteChange: true,
                        autoClose: true
                    });
                    this.submitted = false;
                    this.router.navigate(['/admin/announcements']);
                }
            },
            err => {
                this.alertService.clear();
                this.alertService.error(err, {
                    autoClose: true
                });
            })
    }
}