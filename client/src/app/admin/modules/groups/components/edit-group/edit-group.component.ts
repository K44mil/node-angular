import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { first } from 'rxjs/operators';

import {
    Course,
    Group,
    Specialization,
    Subject,
} from '../../models';
import { AlertService } from '@app/shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { SpecializationsService } from '../../services/specializations.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
    templateUrl: 'edit-group.component.html'
})
export class EditGroupComponent implements OnInit {
    group: Group;
    groupId: string;
    groupLoaded: boolean = false;

    courses: Course[];
    specializations: Specialization[];
    subjects: Subject[];
    countLoaded = 0;

    // --
    availableSpecializations: Specialization[];
    availableSubjects: Subject[];

    editGroupForm: FormGroup;

    constructor(
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private subjectsService: SubjectsService,
        private groupsService: GroupsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.editGroupForm = this.formBuilder.group({
            courseId: ['', Validators.required],
            specializationId: ['', Validators.required],
            subjectId: ['', Validators.required],
            level: ['', Validators.required],
            type: ['', Validators.required],
            academicYear: ['', [Validators.required, Validators.pattern(/^\d{4}[/]\d{4}$/)]],
            groupType: ['', Validators.required],
            number: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
            isOpen: ['']
        });

        this.groupId = this.route.snapshot.paramMap.get('id');

        this.loadCourses();
        this.loadSpecializations();
        this.loadSubjects();  
    }

    get f() { return this.editGroupForm.controls; } 

    onSubmit() {
        if (this.editGroupForm.invalid) return;

        if (this.f.isOpen.value == '') {
            this.editGroupForm.patchValue({
                isOpen: false
            });
        }

        this.groupsService.editGroup(this.groupId, this.editGroupForm.value)
            .pipe(first())
            .subscribe(res => {
                this.alertService.success('Group has been successfully edited.', {
                    autoClose: true
                });
            },
            err => {
                this.alertService.error(err);
                window.scrollTo(0,0);
            });
    }

    loadGroup(id: string) {
        this.groupsService.getGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.group = res.data.group;
                    this.editGroupForm.patchValue({
                        courseId: this.group.courseId,
                        level: this.group.level,
                        type: this.group.type,
                        academicYear: this.group.academicYear,
                        groupType: this.group.groupType,
                        number: this.group.number,
                        isOpen: this.group.isOpen
                    });
                    this.onCourseSelectChange();
                    this.editGroupForm.patchValue({
                        specializationId: this.group.specializationId
                    });
                    this.onSpecializationSelectChange();
                    this.editGroupForm.patchValue({
                        subjectId: this.group.subjectId
                    });
                    this.groupLoaded = true;
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

    loadCourses() {
        this.coursesService.getCourses('?isArchive=0')
            .pipe(first())
            .subscribe(res => {                
                if (res.data.courses)
                    this.courses = res.data.courses;
                this.countLoaded++;
                if (this.countLoaded === 3) this.loadGroup(this.groupId);  
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadSpecializations() {
        this.specializationsService.getSpecializations('?isArchive=0')
            .pipe(first())
            .subscribe(res => {
                if (res.data.specializations)
                    this.specializations = res.data.specializations;
                this.countLoaded++;       
                if (this.countLoaded === 3) this.loadGroup(this.groupId); 
            },
            err => {
                this.alertService.error(err, {
                    autoClose: true
                });
            });
    }

    loadSubjects() {
        this.subjectsService.getSubjects('?isArchive=0')
            .pipe(first())
            .subscribe(res => {
                if (res.data.subjects)
                    this.subjects = res.data.subjects;
                this.countLoaded++;   
                if (this.countLoaded === 3) this.loadGroup(this.groupId);    
            },
            err => {
                this.alertService.error(err);
            });
    }

    setActualAcademicYear() {
        const date = new Date();
        let academicYear = '';

        if (date.getMonth()+1 <= 7) {
            academicYear = `${date.getFullYear()-1}/${date.getFullYear()}`;
        } else {
            academicYear = `${date.getFullYear()}/${date.getFullYear()+1}`;
        }

        this.editGroupForm.patchValue({
            academicYear: academicYear
        });
    }

    // onChange events
    onCourseSelectChange() {
        this.availableSubjects = [];

        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === this.f.courseId.value);
    }

    onSpecializationSelectChange() {
        this.availableSubjects = this.subjects.filter(sub => sub.specializationId === this.f.specializationId.value);
    }
}