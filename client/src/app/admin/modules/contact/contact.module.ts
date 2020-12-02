import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    EditContactComponent,
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
        EditContactComponent
    ]
})
export class ContactModule { }