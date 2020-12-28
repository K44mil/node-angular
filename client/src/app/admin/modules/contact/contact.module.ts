import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    EditContactComponent,
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
        ContactRoutingModule
    ],
    declarations: [
        LayoutComponent,
        EditContactComponent,
        EditUniversityInfoComponent
    ]
})
export class ContactModule { }