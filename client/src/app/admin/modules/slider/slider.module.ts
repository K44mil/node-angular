import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderRoutingModule } from './slider-routing.module';

import {
    AddSliderImageComponent,
    LayoutComponent,
    SliderImagesListComponent
} from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SliderRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        SliderImagesListComponent,
        AddSliderImageComponent
    ]
})
export class SliderModule { }