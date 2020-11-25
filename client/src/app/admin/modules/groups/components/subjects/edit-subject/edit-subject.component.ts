import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Course, Specialization } from '../../../models';
import { CoursesService } from '../../../services/courses.service';
import { SpecializationsService } from '../../../services/specializations.service';
import { SubjectsService } from '../../../services/subjects.service';

@Component({ templateUrl: 'edit-subject.component.html' })
export class EditSubjectComponent implements OnInit {
    editSubjectForm: FormGroup;
    courses: Course[];
    specializations: Specialization[];

    subjectId: string;
    availableSpecializations: Specialization[];

    constructor(
        private formBuilder: FormBuilder,
        private coursesService: CoursesService,
        private specializationsService: SpecializationsService,
        private subjectsService: SubjectsService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCourses();
        this.loadSpecializations();

        this.subjectId = this.route.snapshot.paramMap.get('id');

        this.editSubjectForm = this.formBuilder.group({
            name: ['', Validators.required],
            short: ['', Validators.required],
            isVisible: [''],
            specializationId: ['', Validators.required],
            courseId: ['']
        });

        this.loadSubject(this.subjectId);
    }

    get f() { return this.editSubjectForm.controls; }

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

    loadSubject(id: string) {
        this.subjectsService.getSubject(id)
            .pipe(first())
            .subscribe(
                res => {
                    const sub = res.data.subject;
                    this.editSubjectForm.patchValue({
                        name: sub.name,
                        short: sub.short,
                        specializationId: sub.specializationId,
                        courseId: sub.Specialization.courseId
                    });
                    this.onCourseSelectChange();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/groups/subjects']);
                }
            )
    }

    onCourseSelectChange() {
        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === this.f.courseId.value);
    }

    onSubmit() {
        if (this.editSubjectForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.editSubjectForm.patchValue({
                isVisible: true
            });

        this.subjectsService.createSubject(this.editSubjectForm.value)
        .pipe(first())
        .subscribe(
            res => {
                this.alertService.clear();
                this.alertService.success('Subject has been edited.', {
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