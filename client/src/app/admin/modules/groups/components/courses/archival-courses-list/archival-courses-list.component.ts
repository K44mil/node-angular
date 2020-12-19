import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Course } from '../../../models';

import { CoursesService } from '../../../services/courses.service'; 

@Component({ templateUrl: 'archival-courses-list.component.html'})
export class ArchivalCoursesListComponent implements OnInit {
    courses: Course[];

    constructor(
        private coursesService: CoursesService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCourses();
    }

    loadCourses() {
        this.coursesService.getCourses('?isArchive=1')
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
                        this.loadCourses();
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
                    this.loadCourses();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    window.scrollTo(0, 0);
                }
            )
    }
}