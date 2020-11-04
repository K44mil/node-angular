import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';

import { CKEditorModule } from 'ckeditor4-angular';

import {
    LayoutComponent,
    NewsListComponent,
    AddNewsComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule
    ],
    declarations: [
        LayoutComponent,
        NewsListComponent,
        AddNewsComponent
    ]
})
export class NewsModule { }