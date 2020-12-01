import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AboutPageService } from '../../services/about-page.service';

@Component({ templateUrl: 'add-about-page.component.html' })
export class AddAboutPageComponent implements OnInit {
    addAboutPageForm: FormGroup;

    public config = {
        removeButtons: 'Anchor,Image,Maximize,Scayt,About'
    };

    constructor(
        private aboutPageService: AboutPageService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.addAboutPageForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['']
        });
    }

    get f() { return this.addAboutPageForm.controls; }

    onSubmit() {
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