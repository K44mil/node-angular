import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { SliderService } from '../../services/slider.service';

@Component({ templateUrl: 'edit-slider-image.component.html' })
export class EditSliderImageComponent implements OnInit {
    editSliderImageForm: FormGroup;
    loading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private sliderService: SliderService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.editSliderImageForm = this.formBuilder.group({
            photo: ['', Validators.required],
            photoSource: [''],
            title: ['', Validators.required],
            isVisible: ['']
        });
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

    }
}