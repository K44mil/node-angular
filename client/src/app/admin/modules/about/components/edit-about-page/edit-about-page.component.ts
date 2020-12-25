import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { AboutPageService } from '../../services/about-page.service';

@Component({ templateUrl: 'edit-about-page.component.html' })
export class EditAboutPageComponent implements OnInit {
    editAboutPageForm: FormGroup;
    aboutPageId: string;
    submitted: boolean = false;

    public config = {
        removeButtons: 'Anchor,Maximize,Scayt,About',
        height: '400px'
    };

    constructor(
        private aboutPageService: AboutPageService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.editAboutPageForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            content: ['']
        });

        this.aboutPageId = this.route.snapshot.paramMap.get('id');
        this.loadAboutPage(this.aboutPageId);
    }

    get f() { return this.editAboutPageForm.controls; }

    loadAboutPage(id: string) {
        this.aboutPageService.getAboutPage(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.editAboutPageForm.patchValue({
                        title: res.data.page.title,
                        content: res.data.page.content
                    })
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/about']);
                }
            );
    }

    onSubmit() {
        this.submitted = true;
        if (this.editAboutPageForm.invalid) return;

        this.aboutPageService.updateAboutPage(this.aboutPageId, this.editAboutPageForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('About Page has been edited.', {
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