import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'group-details.component.html',
    styles: [`
        .group-details tbody td {
            padding-left: 20px !important;
        }

        .marks-table {
            border-collapse: collapse;
        }

        .marks-table td, .marks-table th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .marks-table th {
            text-align: center;
        }
    `]
})
export class GroupDetailsComponent implements OnInit {
    group;
    groupId;
    additionRequests = [];

    constructor(
        private route: ActivatedRoute,
        private groupsService: GroupsService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadGroup(this.groupId);
        this.loadAdditionRequests(this.groupId);
    }

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

    loadGroup(id) {
        this.groupsService.getGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.group) this.group = res.data.group;
                    console.log(res);
                },
                err => {
                    this.alertService.error(err);
                }
            )
    }

    loadAdditionRequests(id) {
        this.groupsService.getGroupAdditionRequests(id)
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data.additionRequests)
                        this.additionRequests = res.data.additionRequests;
                },
                err => {
                    this.alertService.error(err);
                }
            )
    }
}