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

    submitted: boolean = false;

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
        this.subjectId = this.route.snapshot.paramMap.get('id');

        this.editSubjectForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            short: ['', [Validators.required, Validators.maxLength(8)]],
            isVisible: [''],
            specializationId: ['', Validators.required],
            courseId: ['']
        });

        this.loadSubject(this.subjectId);
    }

    get f() { return this.editSubjectForm.controls; }

    loadCourses() {
        this.coursesService.getCourses('?isArchive=0')
            .pipe(first())
            .subscribe(
                res => {
                    this.courses = res.data.courses;
                    this.initAvailableSpecializations();
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
        this.specializationsService.getSpecializations('?isArchive=0')
        .pipe(first())
            .subscribe(
                res => {
                    this.specializations = res.data.specializations;
                    this.initAvailableSpecializations();
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
                    this.loadCourses();
                    this.loadSpecializations();
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

    initAvailableSpecializations() {
        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === this.f.courseId.value);
    }

    onCourseSelectChange() {
        this.editSubjectForm.patchValue({
            specializationId: null
        });

        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === this.f.courseId.value);
    }

    onSubmit() {
        this.submitted = true;
        if (this.editSubjectForm.invalid) return;

        if (this.f.isVisible.value === '')
            this.editSubjectForm.patchValue({
                isVisible: true
            });

        this.subjectsService.updateSubject(this.subjectId, this.editSubjectForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Subject has been edited.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.submitted = false;
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