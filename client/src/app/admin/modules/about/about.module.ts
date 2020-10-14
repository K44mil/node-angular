import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';

import {
    LayoutComponent,
    AboutPagesListComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule
    ],
    declarations: [
        LayoutComponent,
        AboutPagesListComponent
    ]
})
export class AboutModule { }