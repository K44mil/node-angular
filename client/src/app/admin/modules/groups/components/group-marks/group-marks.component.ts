import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';
import { MarksService } from '../../services/marks.service';

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
    selectedMarkId: string;

    addMarkForm: FormGroup;
    editMarkForm: FormGroup;

    editedMarkId: string;

    markDescs: any[];

    addMarkFormSubmitted: boolean = false;
    editMarkFormSubmitted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService,
        private formBuilder: FormBuilder,
        private modalService: ModalService,
        private marksService: MarksService,
        private router: Router
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadMarks(this.groupId);

        this.addMarkForm = this.formBuilder.group({
            ids: ['', Validators.required],
            value: ['', Validators.required],
            markDescriptionId: ['', Validators.required]
        });

        this.editMarkForm = this.formBuilder.group({
            id: [''],
            student: [{ value: '', disabled: true }],
            value: ['', Validators.required],
            markDescriptionId: ['', Validators.required]
        });

        this.loadMarkDescriptions();
    }

    get f() { return this.addMarkForm.controls; }
    get ef() { return this.editMarkForm.controls; }

    onSubmit() {
        this.addMarkFormSubmitted = true;
        if (this.addMarkForm.invalid) return;

        this.groupsService.createMarks(this.groupId, this.addMarkForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadMarks(this.groupId);
                    this.addMarkForm.reset();
                    this.addMarkFormSubmitted = false;
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

    onEditFormSubmit() {
        this.editMarkFormSubmitted = true;
        if (this.editMarkForm.invalid) return;

        this.groupsService.updateMark(this.ef.id.value, this.editMarkForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.success('Mark has been edited.', {
                        autoClose: true
                    });
                    this.loadMarks(this.groupId);
                    window.scrollTo(0,0);
                    const editModalButton = document.getElementById('showEditMarkFormButton');
                    editModalButton.click();
                    this.editedMarkId = null;
                    this.selectedMarkId = null;
                    this.editMarkFormSubmitted = false;
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

    loadMarks(id: string) {
        this.groupsService.getGroupMarks(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.members = res.data.members;
                    for (const m of this.members) {
                        if (m.User && m.User.Marks) m.User.Marks = m.User.Marks.filter(m => m.groupId === this.groupId);
                    }
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups']);
                }
            )
    }

    loadMarkDescriptions() {
        this.marksService.getMarkDescriptions()
            .pipe(first())
            .subscribe(
                res => {
                    this.markDescs = res.data.markDescriptions;
                },
                err => {

                }
            )
    }

    onMarkDeleted() {
        this.loadMarks(this.groupId);
    }

    onMarkEdited(id) {
        const editModalButton = document.getElementById('showEditMarkFormButton');
        editModalButton.click();
        this.editedMarkId = id;

        this.groupsService.getMark(id)
            .pipe(first())
            .subscribe(
                res => {
                    const mark = res.data.mark;
                    this.editMarkForm.patchValue({
                        id: mark.id,
                        student: `${mark.User.firstName} ${mark.User.lastName}`,
                        value: mark.value,
                        markDescriptionId: mark.markDescriptionId
                    });
                    setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 300);
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

    // Modal
    getMarkModalClasses() {
        return 'col-md-2,offset-md-4';
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    showMarkDetails(id: string) {
        if (this.editedMarkId) {
            const editModalButton = document.getElementById('showEditMarkFormButton');
            editModalButton.click();
            this.editedMarkId = null;
        }
        
        this.selectedMarkId = id;
        this.openModal('mark-modal');
    }
}