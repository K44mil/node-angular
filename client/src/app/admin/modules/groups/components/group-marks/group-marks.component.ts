import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'group-marks.component.html',
    styles: [`
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
export class GroupMarksComponent implements OnInit {
    groupId: string;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
    }
}