import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';
import { Event } from '../../models/Event';
import { ModalService } from '@app/shared/services/modal.service';
import { ThemePalette } from '@angular/material/core';

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
    editEventForm: FormGroup;
    events: Event[];
    attendance;
    editedEventId: string = null;

    editAttendanceMode: boolean = false;

    selectedPresenceId: string;

    addEventSubmitted: boolean = false;
    editEventSubmitted: boolean = false;

    @ViewChild('pickerAddEvent') pickerAdd: any;
    @ViewChild('pickerEditEvent') pickerEdit: any;

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
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService,
        private modalService: ModalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadGroup(this.groupId);
        this.loadEvents(this.groupId);
        this.loadAttendance(this.groupId);

        // EVENT FORM INIT
        this.eventForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            date: ['', Validators.required],
            groupId: ['']
        });

        // EDIT EVENT FORM INIT
        this.editEventForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            date: ['', Validators.required],
            groupId: ['']
        });
    }

    printDate(dateUTC) {
        return this.parseDateToLocale(dateUTC);
    }

    nullEventEditedId() {
        this.editedEventId = null;
    }

    get f() { return this.eventForm.controls; }
    get ef() { return this.editEventForm.controls; }

    onSubmit() {   
        this.addEventSubmitted = true;
        if (this.eventForm.invalid) return;

        this.eventForm.patchValue({ groupId: this.groupId });

        this.groupsService.createEvent(this.eventForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadEvents(this.groupId);
                    this.loadAttendance(this.groupId);
                    this.addEventSubmitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    onEditEventFormSubmit() {
        this.editEventSubmitted = true;
        if (this.editEventForm.invalid) return;

        this.groupsService.updateEvent(this.editedEventId, this.editEventForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Event has been edited.', {
                        autoClose: true
                    });
                    this.loadEvents(this.groupId);
                    this.loadAttendance(this.groupId);
                    this.editEventSubmitted = false;
                },
                err => {
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )

    }

    editEvent(event) {
        const button = document.getElementById('editEventButton');
        
        if (this.editedEventId == null) { this.editedEventId = event.id; button.click(); }
        else if (this.editedEventId == event.id) { this.editedEventId = null; button.click(); }
        else if (this.editedEventId != event.id) this.editedEventId = event.id;

        // event.dateDate = this.parseDateToLocale(event.date).split(', ')[0];
        // event.dateTime = this.parseDateToLocale(event.date).split(', ')[1];
        event.date = event.date;
        
        this.editEventForm.patchValue({
            name: event.name,
            date: event.date,
            groupId: event.groupId
        });
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

    loadGroup(id) {
        this.groupsService.getGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.group) this.group = res.data.group;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups']);
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
                    this.alertService.clear();
                    this.alertService.error(err);
                }
            );
    }

    loadAttendance(id) {
        this.groupsService.getGroupAttendance(id)
            .pipe(first())
            .subscribe(
                res => {
                    const members = res.data.members;
                    this.attendance = members;
                },
                err => {

                }
            );
    }

    deleteEvent(id) {
        const button = document.getElementById('editEventButton');

        if (id == this.editedEventId) {
            this.editedEventId = null;
            button.click();
        }

        this.groupsService.deleteEvent(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.id) 
                        this.events = this.events.filter(e => e.id !== id);
                    this.loadAttendance(this.groupId);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err);
                    window.scrollTo(0,0);
                }
            );
    }

    // Close & Open Event
    openEvent(id) {
        this.groupsService.openEvent(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadEvents(this.groupId);
                },
                err => {

                }
            )
    }

    closeEvent(id) {
        this.groupsService.closeEvent(id)
        .pipe(first())
        .subscribe(
            res => {
                this.loadEvents(this.groupId);
            },
            err => {

            }
        )
    }

    // Attendance functions
    editAttendanceModeOnOff() {
        if (this.editAttendanceMode)
            this.editAttendanceMode = false;
        else
            this.editAttendanceMode = true;
    }

    setUserAbsent(id: string) {
        this.groupsService.setPresence(id, false)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadAttendance(this.groupId);
                },
                err => {

                }
            )
    }

    setUserPresent(id: string) {
        this.groupsService.setPresence(id, true)
        .pipe(first())
        .subscribe(
            res => {
                this.loadAttendance(this.groupId);
            },
            err => {

            }
        )
    }

    // Modal
    showPresenceDetails(id: string) {
        this.selectedPresenceId = id;
        this.openModal('presence-modal');
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    getPresenceModalClasses() {
        return 'col-md-2,offset-md-4';
    }
}