import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@shared/services';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'edit-course.component.html' })
export class EditCourseComponent implements OnInit {
    editCourseForm: FormGroup;
    courseId: string;
    courseLoaded: boolean = false;

    constructor(
        private alertService: AlertService,
        private coursesService: CoursesService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.courseId = this.route.snapshot.paramMap.get('id');

        this.editCourseForm = this.formBuilder.group({
            name: ['', Validators.required],
            short: ['', Validators.required],
            isVisible: ['']
        });

        this.loadCourse(this.courseId);
    }

    loadCourse(id: string) {
        this.coursesService.getCourse(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.editCourseForm.patchValue({
                        name: res.data.course.name,
                        short: res.data.course.short
                    });
                    this.courseLoaded = true;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups/courses']);
                }
            )
    }

    get f() { return this.editCourseForm.controls; }

    onSubmit() {
        if (this.editCourseForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.editCourseForm.patchValue({
                isVisible: true
            });

        this.coursesService.updateCourse(this.courseId, this.editCourseForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Course has been edited successfully.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            );
    }
}