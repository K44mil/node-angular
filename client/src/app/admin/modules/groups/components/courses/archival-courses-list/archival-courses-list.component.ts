import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Course } from '../../../models';

import { CoursesService } from '../../../services/courses.service'; 

@Component({ templateUrl: 'archival-courses-list.component.html', styles: [`.sort-header { cursor: pointer; }`]})
export class ArchivalCoursesListComponent implements OnInit {
    courses: Course[];

    filterForm: FormGroup;

    // SORTING
    sort = { property: null, order: null };

    query = '';

    constructor(
        private formBuilder: FormBuilder,
        private coursesService: CoursesService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            name: [''],
            short: ['']
        });

        this.prepareQuery();
        this.loadCourses(this.query);
    }

    onFilterFormSubmit() {
        this.prepareQuery();
        this.loadCourses(this.query);
    }

    loadCourses(query: string) {
        this.coursesService.getCourses(query)
            .pipe(first())
            .subscribe(
                res => {
                    this.courses = res.data.courses;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    })
                    window.scrollTo(0,0);
                }
            )
    }

    courseToDeleteId: string;

    setCourseToDelete(id: string) {
        this.courseToDeleteId = id;
    }

    deleteCourse() {
        if (this.courseToDeleteId)
            this.coursesService.deleteCourse(this.courseToDeleteId)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.clear();
                        this.alertService.success('Course has been deleted.', {
                            autoClose: true
                        });
                        this.prepareQuery();
                        this.loadCourses(this.query);
                    },
                    err => {
                        this.alertService.clear();
                        this.alertService.error(err, {
                            autoClose: true
                        })
                        window.scrollTo(0,0);
                    }
                )
    }

    editCourse(id: string) {
        this.router.navigate([`/admin/groups/courses/${id}/edit`]);
    }

    restoreCourse(id: string) {
        this.coursesService.restoreCourse(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.prepareQuery();
                    this.loadCourses(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    window.scrollTo(0, 0);
                }
            )
    }

    clearQuery() {
        this.query = `?isArchive=1`;
    }

    get f() { return this.filterForm.controls; }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    getFilterQuery() {
        let query = '';

        if (this.f.name.value) query += `&name=${this.f.name.value}`;
        if (this.f.short.value) query += `&short=${this.f.short.value}`;

        return query;
    }

    sortBy(property: string) {
        if (this.sort.property === property) {
            if (this.sort.order === 'ASC') this.sort.order = 'DESC';
            else {
                this.sort.property = null;
                this.sort.order = null;
            }
        } else {
            this.sort.property = property;
            this.sort.order = 'ASC';
        }
        this.prepareQuery();
        this.loadCourses(this.query);
    }
}