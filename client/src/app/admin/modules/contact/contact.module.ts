import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CKEditorModule } from 'ckeditor4-angular';

import {
    EditContactComponent,
    EditTermsComponent,
    EditUniversityInfoComponent,
    LayoutComponent
} from './components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ContactRoutingModule,
        CKEditorModule
    ],
    declarations: [
        LayoutComponent,
        EditContactComponent,
        EditUniversityInfoComponent,
        EditTermsComponent
    ]
})
export class ContactModule { }