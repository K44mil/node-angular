import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';

import { SliderService } from '../../services/slider.service';

@Component({ templateUrl: 'slider-images-list.component.html' })
export class SliderImagesListComponent implements OnInit {
    sliderImages: any[];
    selectedImage: any;

    constructor(
        private alertService: AlertService,
        private sliderService: SliderService
    ) { }

    ngOnInit() {
        this.loadSliderImages();
    }

    loadSliderImages() {
        this.sliderService.getSliderImages()
            .pipe(first())
            .subscribe(
                res => {
                    this.sliderImages = res.data.slider;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    deleteSliderImage(id: string) {
        this.sliderService.deleteSliderImage(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Slider Image has been deleted.', {
                        autoClose: true
                    });
                    this.loadSliderImages();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    showImage(image) {
        this.selectedImage = image;

        const btnImageModal = document.getElementById('btnImageModal');
        btnImageModal.click();
    }

    getSelectedImageUrl() {
        return `${environment.hostUrl}/uploads/slider/${this.selectedImage.image}`;
    }
}