import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
    LayoutComponent,
    MainNavComponent,
    AvatarPhotoComponent,
    AboutPageComponent,
    NewsComponent,
    NewsDetailsComponent,
    AnnouncementsComponent,
    ContactPageComponent,
    ResearchPageComponent,
    HomePageComponent,
    CalendarPageComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        MainNavComponent,
        AvatarPhotoComponent,
        AboutPageComponent,
        NewsComponent,
        NewsDetailsComponent,
        AnnouncementsComponent,
        ContactPageComponent,
        ResearchPageComponent,
        HomePageComponent,
        CalendarPageComponent
    ],
    exports: [AvatarPhotoComponent]
})
export class HomeModule { }