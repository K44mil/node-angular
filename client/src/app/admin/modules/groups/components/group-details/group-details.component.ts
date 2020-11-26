import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'group-details.component.html',
    styles: [`
        .group-details tbody td {
            padding-left: 20px !important;
        }
    `]
})
export class GroupDetailsComponent implements OnInit {
    group;
    groupId;
    additionRequests = [];
    groupMembers = [];

    userRemoved: boolean;

    constructor(
        private route: ActivatedRoute,
        private groupsService: GroupsService,
        private alertService: AlertService,
        private router: Router,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadGroup(this.groupId);
        this.loadGroupMembers(this.groupId);
        this.loadAdditionRequests(this.groupId);
    }

    // Format Functions
    printGroupLevel(level) {
        if (level == 'I') return 'first-degree';
        if (level == 'M') return 'second-degree';
    }

    printStudiesType(type) {
        if (type == 'D') return 'full-time';
        if (type == 'Z') return 'part-time';
    }

    printGroupType(type) {
        if (type == 'lab') return 'Laboratory';
        if (type == 'lec') return 'Lecture';
        if (type == 'exc') return 'Exercise';
        if (type == 'proj') return 'Project';
    }

    // Load Data Functions
    loadGroup(id: string) {
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
                        keepAfterRouteChange: false
                    });
                    this.router.navigate(['/admin/groups']);
                }
            )
    }

    loadAdditionRequests(id: string) {
        this.groupsService.getGroupAdditionRequests(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.additionRequests)
                        this.additionRequests = res.data.additionRequests;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        keepAfterRouteChange: false
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    loadGroupMembers(id: string) {
        this.groupsService.getGroupMembers(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.groupMembers = res.data.members;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        keepAfterRouteChange: false
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    // Actions Functions
    acceptAdditionRequest(id: string) {
        this.groupsService.acceptAdditionRequest(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Student has been added to group.', {
                        autoClose: true
                    });
                    this.loadGroupMembers(this.groupId);
                    this.loadAdditionRequests(this.groupId);
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

    rejectAdditionRequest(id: string) {
        this.groupsService.rejectAdditionRequest(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Student request has been rejected.', {
                        autoClose: true
                    });
                    this.loadAdditionRequests(this.groupId);
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

    removeMemberFromGroup(id: string) {
        this.groupsService.removeUserFromGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Student has been successfully removed from this group.', {
                        autoClose: true
                    });
                    if (this.userRemoved) this.userRemoved = false;
                    else this.userRemoved = true;
                    this.loadGroupMembers(this.groupId);
                    this.loadAdditionRequests(this.groupId);
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

    // Modals functions
    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    getAddStudentModalClasses() {
        return 'col-6,offset-6';
    }

    reloadUsers() {
        this.loadAdditionRequests(this.groupId);
        this.loadGroupMembers(this.groupId);
    }
}