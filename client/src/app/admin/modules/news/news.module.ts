import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';

import { CKEditorModule } from 'ckeditor4-angular';

import {
    LayoutComponent,
    NewsListComponent,
    AddNewsComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    FilesFinderComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        NewsListComponent,
        AddNewsComponent,
        CategoriesListComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        FilesFinderComponent
    ]
})
export class NewsModule { }