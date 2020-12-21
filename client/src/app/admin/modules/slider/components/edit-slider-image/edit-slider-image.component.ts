import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { SliderService } from '../../services/slider.service';

@Component({ templateUrl: 'edit-slider-image.component.html' })
export class EditSliderImageComponent implements OnInit {
    editSliderImageForm: FormGroup;
    loading: boolean = false;
    editedSliderImageId: string;

    constructor(
        private formBuilder: FormBuilder,
        private sliderService: SliderService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.editSliderImageForm = this.formBuilder.group({
            photo: [''],
            photoSource: [''],
            title: ['', Validators.required],
            isVisible: ['']
        });

        this.editedSliderImageId = this.route.snapshot.paramMap.get('id');
        this.loadSliderImage(this.editedSliderImageId);
    }

    get f() { return this.editSliderImageForm.controls; }

    loadSliderImage(id: string) {
        this.sliderService.getSliderImage(id)
            .pipe(first())
            .subscribe(
                res => {
                    const sliderImage = res.data.sliderImage;
                    this.editSliderImageForm.patchValue({
                        title: sliderImage.title
                    });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/slider']);
                }
            )
    }

    onPhotoFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.editSliderImageForm.patchValue({
                photoSource: file
            });
        }
    }

    onSubmit() {
        if (this.editSliderImageForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.editSliderImageForm.patchValue({
                isVisible: true
            });
        }

        this.loading = true;

        const formData = new FormData();
        formData.append('photo', this.editSliderImageForm.get('photoSource').value);
        formData.append('title', this.editSliderImageForm.get('title').value);
        formData.append('isVisible', this.editSliderImageForm.get('isVisible').value);

        this.sliderService.updateSliderImage(this.editedSliderImageId, formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Slider Image has been edited.', {
                        autoClose: true
                    });
                    this.loading = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    this.loading = false;
                }
            )
    }
}