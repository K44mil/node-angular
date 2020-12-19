import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { MarksService } from '../../../services/marks.service';

@Component({ templateUrl: 'add-mark-description.component.html' })
export class AddMarkDescriptionComponent implements OnInit {

    addMarkDescriptionForm: FormGroup;

    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private marksService: MarksService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.addMarkDescriptionForm = this.formBuilder.group({
            text: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }

    get f() { return this.addMarkDescriptionForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addMarkDescriptionForm.invalid) return;
        
        this.marksService.createMarkDescription(this.addMarkDescriptionForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Mark Description has been added.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.submitted = false;
                    this.router.navigate(['/admin/groups/marks']);
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