import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { SliderService } from '../../services/slider.service';

@Component({ templateUrl: 'add-slider-image.component.html' })
export class AddSliderImageComponent implements OnInit {
    addSliderImageForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private sliderService: SliderService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.addSliderImageForm = this.formBuilder.group({
            photo: ['', Validators.required],
            photoSource: [''],
            title: ['', Validators.required],
            isVisible: ['']
        });
    }

    get f() { return this.addSliderImageForm.controls; }

    onPhotoFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.addSliderImageForm.patchValue({
                photoSource: file
            });
        }
    }

    onSubmit() {
        if (this.addSliderImageForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.addSliderImageForm.patchValue({
                isVisible: true
            });
        }

        const formData = new FormData();
        formData.append('photo', this.addSliderImageForm.get('photoSource').value);
        formData.append('title', this.addSliderImageForm.get('title').value);
        formData.append('isVisible', this.addSliderImageForm.get('isVisible').value);

        this.sliderService.addSliderImage(formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Slider Image has been added.', {
                        autoClose: true
                    });
                    this.router.navigate(['/admin/slider']);
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