import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';

import {
    LayoutComponent,
    AboutPagesListComponent,
    AddAboutPageComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule
    ],
    declarations: [
        LayoutComponent,
        AboutPagesListComponent,
        AddAboutPageComponent
    ]
})
export class AboutModule { }