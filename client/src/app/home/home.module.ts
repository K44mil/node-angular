import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';

import {
    LayoutComponent,
    MainNavComponent,
    AvatarPhotoComponent,
    AboutPageComponent,
    NewsComponent,
    NewsDetailsComponent,
    AnnouncementsComponent,
    ContactPageComponent,
    ResearchPageComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
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
        ResearchPageComponent
    ],
    exports: [AvatarPhotoComponent]
})
export class HomeModule { }