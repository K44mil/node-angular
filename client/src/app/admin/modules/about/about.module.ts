import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';

import { CKEditorModule } from 'ckeditor4-angular';

import {
    LayoutComponent,
    AboutPagesListComponent,
    AddAboutPageComponent
} from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule,
        CKEditorModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        AboutPagesListComponent,
        AddAboutPageComponent
    ]
})
export class AboutModule { }