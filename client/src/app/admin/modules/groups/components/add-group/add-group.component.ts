import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { first } from 'rxjs/operators';

import {
    University,
    Course,
    Department,
    Faculty,
    Specialization,
    Subject,
} from '../../models';
import { AlertService } from '@app/shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { SpecializationsService } from '../../services/specializations.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
    templateUrl: 'add-group.component.html'
})
export class AddGroupComponent implements OnInit {
    universities: University[];
    faculties: Faculty[];
    departments: Department[];
    courses: Course[];
    specializations: Specialization[];
    subjects: Subject[];
    countLoaded = 0;

    submitted: boolean = false;

    // --
    availableSpecializations: Specialization[];
    availableSubjects: Subject[];

    newGroupForm: FormGroup;

    constructor(
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private subjectsService: SubjectsService,
        private groupsService: GroupsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        // this.loadUniversities();
        // this.loadFaculties();
        // this.loadDepartments();
        this.loadCourses();
        this.loadSpecializations();
        this.loadSubjects();

        this.newGroupForm = this.formBuilder.group({
            // universityId: ['', Validators.required],
            // facultyId: ['', Validators.required],
            // departmentId: ['', Validators.required],
            courseId: ['', Validators.required],
            specializationId: ['', Validators.required],
            subjectId: ['', Validators.required],
            level: ['', Validators.required],
            type: ['', Validators.required],
            // semester: ['', Validators.required],
            academicYear: ['', [Validators.required, Validators.pattern(/^\d{4}[/]\d{4}$/)]],
            groupType: ['', Validators.required],
            number: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
            isOpen: ['']
        });
    }

    logAll() {
        console.table(this.universities);
        console.table(this.faculties);
        console.table(this.departments);
        console.table(this.courses);
        console.table(this.specializations);
        console.table(this.subjects);
    }

    get f() { return this.newGroupForm.controls; } 

    onSubmit() {
        this.submitted = true;
        if (this.newGroupForm.invalid) return;

        if (this.f.isOpen.value == '') {
            this.newGroupForm.patchValue({
                isOpen: false
            });
        }

        this.groupsService.createGroup(this.newGroupForm.value)
            .pipe(first())
            .subscribe(res => {
                this.alertService.success('Group has been added.', {
                    keepAfterRouteChange: true,
                    autoClose: true
                });
                this.submitted = false;
                this.router.navigate(['/admin/groups']);
                this.newGroupForm.reset();
            },
            err => {
                this.alertService.error(err);
                window.scrollTo(0,0);
            });
    }

    loadCourses() {
        this.coursesService.getCourses('?isArchive=0')
            .pipe(first())
            .subscribe(res => {                
                if (res.data.courses)
                    this.courses = res.data.courses;
                this.countLoaded++;         
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
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadSubjects() {
        this.subjectsService.getSubjects('?isArchive=0')
            .pipe(first())
            .subscribe(res => {
                if (res.data.subjects)
                    this.subjects = res.data.subjects;
                this.countLoaded++;       
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

        this.newGroupForm.patchValue({
            academicYear: academicYear
        });
    }

    // onChange events
    onCourseSelectChange(e) {
        this.availableSubjects = [];

        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === e.target.value);
    }

    onSpecializationSelectChange(e) {
        this.availableSubjects = this.subjects.filter(sub => sub.specializationId === e.target.value);
    }
}