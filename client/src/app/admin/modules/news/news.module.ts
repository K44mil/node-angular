import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';

import { LayoutComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule
    ],
    declarations: [
        LayoutComponent
    ]
})
export class NewsModule { }