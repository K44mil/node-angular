import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({ templateUrl: 'group-details.component.html' })
export class GroupDetailsComponent implements OnInit {
    group;

    constructor(
        private route: ActivatedRoute,
        private groupsService: GroupsService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadGroup(id);
    }

    loadGroup(id) {
        this.groupsService.getGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    // if (res.data.group) this.group = res.data.group;
                    console.log(res);
                },
                err => {
                    console.log(err);
                }
            )
    }
    
    
}