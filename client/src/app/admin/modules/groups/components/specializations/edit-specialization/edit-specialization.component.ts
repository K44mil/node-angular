import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@shared/services';
import { Course } from '../../../models/Course';
import { SpecializationsService } from '../../../services/specializations.service';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'edit-specialization.component.html' })
export class EditSpecializationComponent implements OnInit {
    editSpecializationForm: FormGroup;
    specializationId: string;
    specLoaded: boolean = false;
    courses: Course[];

    constructor(
        private alertService: AlertService,
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCourses();

        this.specializationId = this.route.snapshot.paramMap.get('id');

        this.editSpecializationForm = this.formBuilder.group({
            name: ['', Validators.required],
            short: ['', Validators.required],
            isVisible: [''],
            courseId: ['', Validators.required]
        });

        this.loadSpecialization(this.specializationId);
    }

    get f() { return this.editSpecializationForm.controls; }

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

    loadSpecialization(id: string) {
        this.specializationsService.getSpecialization(id)
            .pipe(first())
            .subscribe(
                res => {
                    const spec = res.data.specialization;
                    this.editSpecializationForm.patchValue({
                        name: spec.name,
                        short: spec.short,
                        courseId: spec.courseId
                    });
                    this.specLoaded = true;                  
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups/specializations']);
                }
            )
    }

    onSubmit() {
        if (this.editSpecializationForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.editSpecializationForm.patchValue({
                isVisible: true
            });

        this.specializationsService.updateSpecialization(this.specializationId, this.editSpecializationForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Specialization has been edited.', {
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
            )
    }
}