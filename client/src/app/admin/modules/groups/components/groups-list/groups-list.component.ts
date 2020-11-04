import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Group } from '../../models';
import { GroupsService } from '../../services/groups.service';

@Component({ templateUrl: 'groups-list.component.html' })
export class GroupsListComponent implements OnInit {
    groups: Group[];

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadGroups();
    }

    loadGroups() {
        this.groupsService.getActiveGroups()
            .pipe(first())
            .subscribe(res => {
                if (res.data.groups)
                    this.groups = res.data.groups;
            },
            err => {
                this.alertService.error(err);
            })
    }

    deleteGroup(id) {
        if (confirm("Are you sure to delete this group?")) {
            this.groupsService.deleteGroup(id)
                .pipe(first())
                .subscribe(
                    res => {
                        if (res.success == true) {
                            this.alertService.success('Group has been deleted.', {
                                autoClose: true
                            });
                        }
                        this.loadGroups();
                    },
                    err => {
                        this.alertService.error(err);
                        window.scrollTo(0,0);
                    }
                );
        }
    }

}