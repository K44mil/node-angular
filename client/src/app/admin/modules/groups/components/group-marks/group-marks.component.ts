import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';
import { MarksService } from '../../services/marks.service';
import { NotesService } from '../../services/notes.service';

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

                .add-mark-table {
                    border-collapse: collapse;
                }

                .add-mark-table th, .add-mark-table td {
                    border: 1px solid #ddd;
                    padding: 5px;
                }

                .add-mark-table tr:hover {
                    background-color: #338DF5;
                    color: #fff;
                }

                .add-mark-table .mark-td:hover {
                    background-color: #0A6CDE;
                    cursor: pointer;
                }
            `]
})
export class GroupMarksComponent implements OnInit {
    groupId: string;
    members;
    selectedMarkId: string;

    addMarkForm: FormGroup;
    addMarkForm2: FormGroup;
    editMarkForm: FormGroup;

    editedMarkId: string;

    markDescs: any[];

    addMarkFormSubmitted: boolean = false;
    editMarkFormSubmitted: boolean = false;

    addNoteForm: FormGroup;
    editNoteForm: FormGroup;

    addNoteFormSubmitted: boolean = false;
    editNoteFormSubmitted: boolean = false;

    reportLoading: boolean = false;

    // Test adding mark method
    markValues = ['2.0', '3.0', '3.5', '4.0', '4.5', '5.0'];

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private groupsService: GroupsService,
        private formBuilder: FormBuilder,
        private modalService: ModalService,
        private marksService: MarksService,
        private router: Router,
        private notesService: NotesService
    ) { }

    ngOnInit() {
        this.groupId = this.route.snapshot.paramMap.get('id');
        this.loadMarks(this.groupId);

        this.addMarkForm = this.formBuilder.group({
            ids: ['', Validators.required],
            value: ['', Validators.required],
            final: [''],
            markDescriptionId: ['', Validators.required]
        });

        this.addMarkForm2 = this.formBuilder.group({
            final: [''],
            markDescriptionId: ['', Validators.required]
        });

        this.editMarkForm = this.formBuilder.group({
            id: [''],
            student: [{ value: '', disabled: true }],
            value: ['', Validators.required],
            final: [''],
            markDescriptionId: ['', Validators.required]
        });

        this.addNoteForm = this.formBuilder.group({
            text: ['', Validators.maxLength(500)]
        });

        this.editNoteForm = this.formBuilder.group({
            text: ['', Validators.maxLength(500)]
        });

        this.loadMarkDescriptions();
    }

    get f() { return this.addMarkForm.controls; }
    get ef() { return this.editMarkForm.controls; }
    get nf() { return this.addNoteForm.controls; }
    get enf() { return this.editNoteForm.controls; }

    get f2() { return this.addMarkForm2.controls; }

    addMarkDescriptionVisible = true;

    onAddMarkFinalChange() {
        if (this.f.final.value)
            this.addMarkDescriptionVisible = false;
        else this.addMarkDescriptionVisible = true;

        console.log(this.addMarkDescriptionVisible);
    }

    editMarkDescriptionVisible = true;

    onEditMarkFinalChange() {
        if (this.ef.final.value)
            this.editMarkDescriptionVisible = false;
        else this.editMarkDescriptionVisible = true;
    }

    addMark2DescriptionVisible = true;

    onAddMark2FinalChange() {
        if (this.f2.final.value)
            this.addMark2DescriptionVisible = false;
        else this.addMark2DescriptionVisible = true;
    }

    onSubmit() {
        this.addMarkFormSubmitted = true;

        if (this.f.final.value === '')
            this.addMarkForm.patchValue({ final: false });

        if (this.f.final.value === true)
            this.addMarkForm.patchValue({ markDescriptionId: '1' });

        if (this.addMarkForm.invalid) return;

        this.groupsService.createMarks(this.groupId, this.addMarkForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadMarks(this.groupId);
                    this.addMarkForm.reset();
                    this.addMarkDescriptionVisible = true;
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

        if (this.ef.final.value === '')
            this.editMarkForm.patchValue({ final: false });

        if (this.ef.final.value === true)
            this.editMarkForm.patchValue({ markDescriptionId: '1' });

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
                    this.editMarkDescriptionVisible = true;
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
                    // for (const m of this.members) {
                    //     if (m.User && m.User.Marks) m.User.Marks = m.User.Marks.filter(m => m.groupId === this.groupId);
                    // }
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
                        final: mark.final,
                        value: mark.value,
                        markDescriptionId: mark.markDescriptionId
                    });
                    if (this.ef.final.value) {
                        this.editMarkDescriptionVisible = false;
                        this.editMarkForm.patchValue({ markDescriptionId: null });
                    } else 
                        this.editMarkDescriptionVisible = true;
                        
                    window.scrollTo(0, 0);
                },
                err => {

                }
            )
    }

    calculateAverage(marks) {
        let sum = 0, count = 0;
        for (const m of marks) {
            if (!m.final) {
                sum += Number(m.value);
                count++;
            }
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

    // NOTE
    selectedNoteUser: any;
    selectNoteUser(m) {
        this.selectedNoteUser = m;
    }

    editNote(m) {
        this.selectedNoteUser = m;
        this.editNoteForm.patchValue({
            text: m.note.text
        });
    }

    onAddNoteFormSubmit() {
        this.addNoteFormSubmitted = true;
        if (this.addNoteForm.invalid) return;

        const body = {
            text: this.nf.text.value,
            userId: this.selectedNoteUser.id,
            groupId: this.groupId
        };

        this.notesService.createNote(body)
            .pipe(first())
            .subscribe(
                res => {
                    this.selectedNoteUser.note = res.data.studentNote;
                    const btnClose = document.getElementById('btnCloseAddNoteModal');
                    this.selectedNoteUser = null;
                    btnClose.click();
                    this.addNoteFormSubmitted = false;
                    this.addNoteForm.reset();
                },
                err => {
                    // console.log(err);
                }
            )
    }

    onEditNoteFormSubmit() {
        this.editNoteFormSubmitted = true;
        if (this.editNoteForm.invalid) return;

        const body = {
            text: this.editNoteForm.controls.text.value
        };

        this.notesService.updateNote(this.selectedNoteUser.note.id, body)
            .pipe(first())
            .subscribe(
                res => {
                    this.selectedNoteUser.note = res.data.studentNote;
                    const btnClose = document.getElementById('btnCloseEditNoteForm');
                    this.selectedNoteUser = null;
                    btnClose.click();
                    this.editNoteFormSubmitted = false;
                    this.editNoteForm.reset();
                },
                err => {

                }
            )
    }

    deleteNote(id: string) {
        this.notesService.deleteNote(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.selectedNoteUser.note = null;
                    const btnClose = document.getElementById('btnCloseEditNoteForm');
                    this.selectedNoteUser = null;
                    btnClose.click(); 
                },
                err => {

                }
            )
    }

    getReport() {
        this.reportLoading = true;
        this.groupsService.getGroupMarksReport(this.groupId)
            .pipe(first())
            .subscribe(
                res => {
                    let blob: any = new Blob([res], { type: `application/pdf` });
                    let url = window.URL.createObjectURL(blob);
                    let anchor = document.createElement('a');
                    anchor.download = 'report.pdf';
                    anchor.href = url;
                    anchor.click();
                    this.reportLoading = false
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.reportLoading = false
                    window.scrollTo(0,0);
                }
            )
    }

    printMarkTable(members) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.innerText = "Test";
        tr.appendChild(td);

        return tr;
    }

    getFinalMark(marks) {
        for (const m of marks)
            if (m.final) return m;
        return '';
    }

    hasFinalMark(marks) {
        for (const m of marks)
            if (m.final) return true;
        return false;
    }

    getNotFinalMarks(marks) {
        const notFinalMarks = [];
        for (const m of marks)
            if (!m.final) notFinalMarks.push(m);
        return notFinalMarks;
    }

    marksLengthWithoutFinal(marks) {
        const notFinalMarks = [];
        for (const m of marks)
            if (!m.final) notFinalMarks.push(m);
        return notFinalMarks.length;
    }

    addMarkForm2Submitted: boolean = false;

    addMark(id: string, value: string) {
        this.addMarkForm2Submitted = true;

        if (this.f2.final.value === '')
            this.addMarkForm2.patchValue({ final: false });

        if (this.f2.final.value === true)
            this.addMarkForm2.patchValue({ markDescriptionId: '1' });

        if (this.addMarkForm2.invalid) return;

        const reqBody = {
            id: id,
            value: value,
            markDescriptionId: this.f2.markDescriptionId.value,
            final: this.f2.final.value
        };

        this.marksService.createMark(this.groupId, reqBody)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadMarks(this.groupId);
                    this.addMarkForm2Submitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    this.addMarkForm2Submitted = false;
                }
            )
    }
}