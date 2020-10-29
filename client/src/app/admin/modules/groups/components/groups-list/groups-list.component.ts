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

}