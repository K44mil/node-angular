import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';

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
        ReactiveFormsModule,
        JwPaginationModule,
    ],
    declarations: [
        LayoutComponent,
        AnnouncementsListComponent,
        AddAnnouncementComponent
    ]
})
export class AnnouncementsModule { }