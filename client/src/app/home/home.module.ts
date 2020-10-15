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
    AnnouncementsComponent
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
        AnnouncementsComponent
    ]
})
export class HomeModule { }