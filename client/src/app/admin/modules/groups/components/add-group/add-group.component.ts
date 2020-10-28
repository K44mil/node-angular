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

    newGroupForm: FormGroup;

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadUniversities();
        this.loadFaculties();
        this.loadDepartments();
        this.loadCourses();
        this.loadSpecializations();
        this.loadSubjects();

        this.newGroupForm = this.formBuilder.group({
            universityId: ['', Validators.required]
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

    logValue() {
        console.log(this.f.universityId.value);
    }

    loadUniversities() {
        this.groupsService.getVisibleUniversities()
            .pipe(first())
            .subscribe(res => {
                if (res.data.universities)
                    this.universities = res.data.universities;
                this.countLoaded++;         
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadFaculties() {
        this.groupsService.getVisibleFaculties()
            .pipe(first())
            .subscribe(res => {
                if (res.data.faculties)
                    this.faculties = res.data.faculties;  
                this.countLoaded++;         
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadDepartments() {
        this.groupsService.getVisibleDepartments()
            .pipe(first())
            .subscribe(res => {
                if (res.data.departments)
                    this.departments = res.data.departments;
                this.countLoaded++;           
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadCourses() {
        this.groupsService.getVisibleCourses()
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
        this.groupsService.getVisibleSpecializations()
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
        this.groupsService.getVisibleSubjects()
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
}