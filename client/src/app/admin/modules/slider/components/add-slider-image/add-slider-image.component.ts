import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';

import { SliderService } from '../../services/slider.service';

@Component({
    templateUrl: 'add-slider-image.component.html',
    styles: [`
        .image-preview { width: 200px; height: 200px; }
    `]
})
export class AddSliderImageComponent implements OnInit {
    addSliderImageForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;

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
            caption: ['', Validators.maxLength(50)],
            secondCaption: ['', Validators.maxLength(50)],
            isVisible: ['']
        });
    }

    get f() { return this.addSliderImageForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addSliderImageForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.addSliderImageForm.patchValue({
                isVisible: true
            });
        }

        this.loading = true;

        const formData = new FormData();
        formData.append('photo', this.addSliderImageForm.get('photo').value);
        formData.append('caption', this.addSliderImageForm.get('caption').value);
        formData.append('secondCaption', this.addSliderImageForm.get('secondCaption').value);
        formData.append('isVisible', this.addSliderImageForm.get('isVisible').value);

        this.sliderService.addSliderImage(formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Slider Image has been added.', {
                        autoClose: true
                    });
                    this.loading = false;
                    this.submitted = false;
                    this.router.navigate(['/admin/slider']);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.loading = false;
                    this.submitted = false;
                }
            )
    }

    photoUrl = `${environment.hostUrl}/uploads/slider/no-photo.jpg`;
    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) {
            this.photoUrl = `${environment.hostUrl}/uploads/slider/no-photo.jpg`;
            return;
        }
        this.addSliderImageForm.patchValue({
            photo: file
        });
        this.addSliderImageForm.get('photo').updateValueAndValidity();

        // Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.photoUrl = reader.result as string;
        }
        reader.readAsDataURL(file);
    }
}