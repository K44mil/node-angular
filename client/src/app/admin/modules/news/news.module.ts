import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';

import {
    LayoutComponent,
    NewsListComponent,
    AddNewsComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        NewsListComponent,
        AddNewsComponent
    ]
})
export class NewsModule { }