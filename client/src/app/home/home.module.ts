import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';

import {
    LayoutComponent,
    MainNavComponent,
    AvatarPhotoComponent
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
        AvatarPhotoComponent
    ]
})
export class HomeModule { }