import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

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
    group;
    eventForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadGroup(id);


        // EVENT FORM INIT
        this.eventForm = this.formBuilder.group({

        });
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
}