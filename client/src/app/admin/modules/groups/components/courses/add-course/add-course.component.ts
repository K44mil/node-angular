import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@shared/services';
import { CoursesService } from '../../../services/courses.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'add-course.component.html' })
export class AddCourseComponent implements OnInit {
    addCourseForm: FormGroup;

    submitted: boolean = false;

    constructor(
        private alertService: AlertService,
        private coursesService: CoursesService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.addCourseForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            short: ['', [Validators.required, Validators.maxLength(8)]],
            isVisible: ['']
        });
    }

    get f() { return this.addCourseForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addCourseForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.addCourseForm.patchValue({
                isVisible: true
            });

        this.coursesService.createCourse(this.addCourseForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Course has been added successfully.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.submitted = false;
                    this.router.navigate(['/admin/groups/courses']);
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