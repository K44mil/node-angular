import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AnnouncementsRoutingModule } from './announcements-routing.module';

import {
    AddAnnouncementComponent,
    AnnouncementsListComponent,
    LayoutComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AnnouncementsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        AnnouncementsListComponent,
        AddAnnouncementComponent
    ]
})
export class AnnouncementsModule { }