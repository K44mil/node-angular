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
    NewsAccessSettings,
    UsersFinder,
    CoursesFinderComponent,
    EditNewsComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { UsersModule } from '../users/users.module';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule,
        SharedModule,
        UsersModule
    ],
    declarations: [
        LayoutComponent,
        NewsListComponent,
        AddNewsComponent,
        CategoriesListComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        FilesFinderComponent,
        NewsAccessSettings,
        UsersFinder,
        CoursesFinderComponent,
        EditNewsComponent
    ]
})
export class NewsModule { }