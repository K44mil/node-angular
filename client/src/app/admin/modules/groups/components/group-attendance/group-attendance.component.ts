import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';
import { Event } from '../../models/Event';

@Component({
    templateUrl: 'group-attendance.component.html',
    styles: [`
        .attendance-table {
            border-collapse: collapse;
        }

        .attendance-table td, .attendance-table th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .attendance-table th {
            text-align: center;
        }

        .attendance-table td span p {
            opacity: 0;
        }
    `]
})
export class GroupAttendanceComponent implements OnInit {
    groupId;
    group;
    eventForm: FormGroup;
    events: Event[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadGroup(this.groupId);
        this.loadEvents(this.groupId);
        this.loadAttendance(this.groupId);

        // EVENT FORM INIT
        this.eventForm = this.formBuilder.group({
            name: ['', Validators.required],
            dateDate: ['', Validators.required],
            dateTime: ['', Validators.required],
            date: [''],
            groupId: ['']
        });
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    get f() { return this.eventForm.controls; }

    onSubmit() {
        if (this.eventForm.invalid) return;

        this.eventForm.patchValue({
            date: `${this.f.dateDate.value} ${this.f.dateTime.value}`,
            groupId: this.groupId
        });

        this.groupsService.createEvent(this.eventForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadEvents(this.groupId);
                },
                err => {
                    this.alertService.error(err);
                }
            )
    }

    loadGroup(id) {
        this.groupsService.getGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.group) this.group = res.data.group;
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    loadEvents(id) {
        this.groupsService.getEvents(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.events)
                        this.events = res.data.events;
                },
                err => {
                    this.alertService.error(err);
                }
            );
    }

    loadAttendance(id) {
        this.groupsService.getGroupAttendance(id)
            .pipe(first())
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {

                }
            );
    }
}