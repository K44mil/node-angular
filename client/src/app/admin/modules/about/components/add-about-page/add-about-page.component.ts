import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AboutPageService } from '../../services/about-page.service';

@Component({ templateUrl: 'add-about-page.component.html' })
export class AddAboutPageComponent implements OnInit {
    addAboutPageForm: FormGroup;
    submitted: boolean = false;

    public config = {
        removeButtons: 'Anchor,Maximize,Scayt,About',
        height: '400px'
    };

    constructor(
        private aboutPageService: AboutPageService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.addAboutPageForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            priority: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
            content: ['']
        });
    }

    get f() { return this.addAboutPageForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addAboutPageForm.invalid) return;

        this.aboutPageService.createAboutPage(this.addAboutPageForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('About Page has been created.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.submitted = false;
                    this.router.navigate(['/admin/about']);
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