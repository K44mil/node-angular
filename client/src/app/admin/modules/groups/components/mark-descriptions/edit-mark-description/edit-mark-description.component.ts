import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { MarksService } from '../../../services/marks.service';

@Component({ templateUrl: 'edit-mark-description.component.html' })
export class EditMarkDescriptionComponent implements OnInit {
    markDescId: string;
    editMarkDescriptionForm: FormGroup;

    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private marksService: MarksService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.editMarkDescriptionForm = this.formBuilder.group({
            text: ['', [Validators.required, Validators.maxLength(50)]]
        })

        this.markDescId = this.route.snapshot.paramMap.get('id');
        this.loadMarkDescription(this.markDescId);
    }

    get f() { return this.editMarkDescriptionForm.controls; }

    loadMarkDescription(id: string) {
        this.marksService.getMarkDescription(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.editMarkDescriptionForm.patchValue({
                        text: res.data.markDesc.text
                    });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    })
                }
            )
    }

    onSubmit() {
        this.submitted = true;
        if (this.editMarkDescriptionForm.invalid) return;
        
        this.marksService.updateMarkDescription(this.markDescId, this.editMarkDescriptionForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Mark Description has been edited.', {
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