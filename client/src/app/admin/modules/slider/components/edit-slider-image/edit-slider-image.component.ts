import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';
import { SliderService } from '../../services/slider.service';

@Component({
    templateUrl: 'edit-slider-image.component.html',
    styles: [`
        .image-preview { width: 200px; height: 200px; }
    `]
})
export class EditSliderImageComponent implements OnInit {
    editSliderImageForm: FormGroup;
    loading: boolean = false;
    editedSliderImageId: string;
    sliderImageName: string = 'no-photo.jpg';;
    submitted: boolean = false;

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
            caption: ['', Validators.maxLength(50)],
            secondCaption: ['', Validators.maxLength(50)],
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
                        caption: sliderImage.caption,
                        secondCaption: sliderImage.secondCaption
                    });
                    this.sliderImageName = sliderImage.image;
                    this.photoUrl = `${environment.serverUrl}/uploads/slider/${this.sliderImageName}`;
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

    onSubmit() {
        this.submitted = true;
        if (this.editSliderImageForm.invalid) return;

        if (this.f.isVisible.value == '') {
            this.editSliderImageForm.patchValue({
                isVisible: true
            });
        }

        this.loading = true;

        const formData = new FormData();
        formData.append('photo', this.editSliderImageForm.get('photo').value);
        formData.append('caption', this.editSliderImageForm.get('caption').value);
        formData.append('secondCaption', this.editSliderImageForm.get('secondCaption').value);
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
                    this.submitted = false;
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

    photoUrl = `${environment.serverUrl}/uploads/slider/${this.sliderImageName}`;
    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) {
            this.photoUrl = `${environment.serverUrl}/uploads/slider/${this.sliderImageName}`;
            return;
        }
        this.editSliderImageForm.patchValue({
            photo: file
        });
        this.editSliderImageForm.get('photo').updateValueAndValidity();

        // Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.photoUrl = reader.result as string;
        }
        reader.readAsDataURL(file);
    }
}