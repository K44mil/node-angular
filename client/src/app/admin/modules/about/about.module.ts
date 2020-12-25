import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';

import { CKEditorModule } from 'ckeditor4-angular';

import {
    LayoutComponent,
    AboutPagesListComponent,
    AddAboutPageComponent,
    EditAboutPageComponent
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
        AddAboutPageComponent,
        EditAboutPageComponent
    ]
})
export class AboutModule { }