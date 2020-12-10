import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GroupsService } from '@app/admin/modules/groups/services/groups.service';
import { PageService } from '@app/home/services';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'groups.component.html',
})
export class GroupsComponent implements OnInit {
    groups;
    events;
    marks;
    attendance: string = '0';
    selectGroupForm: FormGroup;
    selectedGroupId: string;

    constructor(
        private alertService: AlertService,
        private groupsService: GroupsService,
        private formBuilder: FormBuilder,
        private pageService: PageService
    ) { }

    ngOnInit() {
        this.selectGroupForm = this.formBuilder.group({
            selectGroup: ['']
        });

        this.pageService.profilePage.next('groups');

        this.groupsService.getMyGroups()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.groups) {
                        this.groups = res.data.groups;
                        if (this.groups.length > 0) {
                            this.selectedGroupId = this.groups[0].Group.id;
                            this.loadSelectedGroup(this.selectedGroupId);
                            this.selectGroupForm.patchValue({
                                selectGroup: this.groups[0].Group.id
                            });
                        }
                    }
                },
                err => {

                }
            )
    }

    get f() { return this.selectGroupForm.controls; }

    onSelectGroupChange() {
        this.selectedGroupId = this.f.selectGroup.value;
        this.loadSelectedGroup(this.selectedGroupId);
    }

    loadSelectedGroup(id) {
        this.groupsService.getMyGroupDetails(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.events) this.events = res.data.events;
                    this.countAttendance();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )

        this.groupsService.getMyMarks(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.marks = res.data.marks;
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

    printDate(dateUTC) {
        return new Date(dateUTC).toLocaleString('pl', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    }

    confirmPresence(id) {
        this.groupsService.confirmPresence(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.success) this.loadSelectedGroup(this.selectedGroupId);
                },
                err => {
                    this.loadSelectedGroup(this.selectedGroupId);
                    this.alertService.clear();
                    this.alertService.error(err);
                    window.scrollTo(0,0);    
                }
            );
    }

    countAttendance() {
        let confirmedPresence = 0;
        for (const e of this.events) {
            if (e.Presences[0].isConfirmed) confirmedPresence++;
        }
        if (this.events.length > 0)
        this.attendance = String((Math.floor(confirmedPresence/this.events.length * 100)));
    }
}