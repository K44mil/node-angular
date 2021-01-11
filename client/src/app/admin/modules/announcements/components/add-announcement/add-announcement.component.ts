import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { AnnouncementValidator } from '../../validators/AnnouncementValidator';
import { AnnouncementsService } from '../../services/announcements.service'; 
import { ThemePalette } from '@angular/material/core';

@Component({ templateUrl: 'add-announcement.component.html' })
export class AddAnnouncementComponent implements OnInit {
    addAnnouncementForm: FormGroup;
    submitted: boolean = false;

    @ViewChild('pickerFrom') pickerFrom: any;
    @ViewChild('pickerTo') pickerTo: any;

    // Datepicker
    public date: Date;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public minDate: Date;
    public maxDate: Date;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    public stepHours = [1, 2, 3, 4, 5];
    public stepMinutes = [1, 5, 10, 15, 20, 25];
    public stepSeconds = [1, 5, 10, 15, 20, 25];

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
            visibleFrom: ['', Validators.required],
            visibleTo: ['', Validators.required],
            isVisible: ['']
        }, {
            // validator: AnnouncementValidator('visibleFromDate', 'visibleFromTime', 'visibleToDate', 'visibleToTime')
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