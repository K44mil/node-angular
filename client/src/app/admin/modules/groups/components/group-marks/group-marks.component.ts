import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

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
    members;

    addMarkForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadMarks(this.groupId);

        this.addMarkForm = this.formBuilder.group({
            ids: ['', Validators.required],
            value: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    get f() { return this.addMarkForm.controls; }

    onSubmit() {
        if (this.addMarkForm.invalid) return;

        this.groupsService.createMarks(this.groupId, this.addMarkForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadMarks(this.groupId);
                    this.addMarkForm.reset();
                },
                err => {

                }
            )
    }

    loadMarks(id: string) {
        this.groupsService.getGroupMarks(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.members = res.data.members;
                },
                err => {

                }
            )
    }

    calculateAverage(marks) {
        let sum = 0, count = 0;
        for (const m of marks) {
            sum += Number(m.value);
            count++;
        }

        return (sum/count).toFixed(2);
    }

    printMark(mark) {
        return Number(mark).toFixed(1);
    }
}