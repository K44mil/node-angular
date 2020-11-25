import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@shared/services';
import { Course } from '../../../models/Course';
import { SpecializationsService } from '../../../services/specializations.service';
import { CoursesService } from '../../../services/courses.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'add-specialization.component.html' })
export class AddSpecializationComponent implements OnInit {
    addSpecializationForm: FormGroup;
    courses: Course[];

    constructor(
        private alertService: AlertService,
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCourses();

        this.addSpecializationForm = this.formBuilder.group({
            name: ['', Validators.required],
            short: ['', Validators.required],
            isVisible: [''],
            courseId: ['', Validators.required]
        });
    }

    get f() { return this.addSpecializationForm.controls; }

    loadCourses() {
        this.coursesService.getCourses()
            .pipe(first())
            .subscribe(
                res => {
                    this.courses = res.data.courses;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    onSubmit() {
        if (this.addSpecializationForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.addSpecializationForm.patchValue({
                isVisible: true
            });

        this.specializationsService.createSpecialization(this.addSpecializationForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Specialization has been added.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups/specializations']);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }
}