import { Component, OnInit } from '@angular/core';
import { GroupsService } from '@app/admin/modules/groups/services/groups.service';
import { PageService } from '@app/home/services';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'find-group.component.html' })
export class FindGroupComponent implements OnInit {
    additionRequests: any;

    constructor(
        private pageService: PageService,
        private groupsService: GroupsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.pageService.profilePage.next('find-group');

        this.loadAdditionRequests();
    }

    loadAdditionRequests() {
        this.groupsService.getMyAdditionRequests()
            .pipe(first())
            .subscribe(
                res => {
                    this.additionRequests = res.data.additionRequests;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    public selectedGroupId: string;

    onGroupFinderChanged(event) {
        this.selectedGroupId = event;
    }

    sendAdditionRequest() {
        this.groupsService.sendAdditionRequest(this.selectedGroupId)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Your request has been sent.', {
                        autoClose: true
                    });
                    this.loadAdditionRequests();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    cancelAdditionRequest(id: string) {
        this.groupsService.cancelAdditionRequest(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Request has been canceled.', {
                        autoClose: true
                    });
                    this.loadAdditionRequests();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }
}