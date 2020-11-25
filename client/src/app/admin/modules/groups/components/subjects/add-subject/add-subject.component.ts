import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Course, Specialization } from '../../../models';
import { CoursesService } from '../../../services/courses.service';
import { SpecializationsService } from '../../../services/specializations.service';
import { SubjectsService } from '../../../services/subjects.service';

@Component({ templateUrl: 'add-subject.component.html' })
export class AddSubjectComponent implements OnInit {
    addSubjectForm: FormGroup;
    courses: Course[];
    specializations: Specialization[];

    availableSpecializations: Specialization[];

    constructor(
        private formBuilder: FormBuilder,
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private subjectsService: SubjectsService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadCourses();
        this.loadSpecializations();

        this.addSubjectForm = this.formBuilder.group({
            name: ['', Validators.required],
            short: ['', Validators.required],
            isVisible: [''],
            specializationId: ['', Validators.required],
        });
    }

    get f() { return this.addSubjectForm.controls; }

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

    loadSpecializations() {
        this.specializationsService.getSpecializations()
        .pipe(first())
            .subscribe(
                res => {
                    this.specializations = res.data.specializations;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    onCourseSelectChange(e) {
        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === e.target.value);
    }

    onSubmit() {
        if (this.addSubjectForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.addSubjectForm.patchValue({
                isVisible: true
            });

        this.subjectsService.createSubject(this.addSubjectForm.value)
        .pipe(first())
        .subscribe(
            res => {
                this.alertService.clear();
                this.alertService.success('Subject has been added.', {
                    autoClose: true,
                    keepAfterRouteChange: true
                });
                this.router.navigate(['/admin/groups/subjects']);
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